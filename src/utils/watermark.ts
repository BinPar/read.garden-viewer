import { Config, WatermarkPosition } from '../model/config';
import { State } from '../model/state';
import { ScrollModes } from '../model/viewerSettings';

/**
 * Watermark rendering.
 *
 * Driven by two config values passed by the host app:
 *  - `config.watermarkText`     -> text shown over every page (already resolved,
 *                                  the SDK does no `{{name}}` replacement).
 *  - `config.watermarkPosition` -> 'top' | 'bottom' | 'left' | 'right'
 *                                  (defaults to 'bottom').
 *
 * Fixed layout: one watermark is injected into every page container
 * (`.rg-fixed-content-container`), sized relative to the page via CSS so it
 * scales with the page (and with zoom/fit, since the whole placeholder is
 * transform-scaled).
 *
 * Flow layout: a dedicated layer holds one watermark per virtual page (column),
 * rebuilt on every layout recalculation so it tracks column width / count.
 *
 * Styling lives in `read.garden-viewer.css` (`.rg-watermark*` rules). Because
 * `publish-t3` does not copy the CSS, the same rules must also exist in the host
 * app stylesheet.
 */

export const WATERMARK_CLASS = 'rg-watermark';
export const WATERMARK_LAYER_CLASS = 'rg-watermark-layer';
export const WATERMARK_SLOT_CLASS = 'rg-watermark-slot';

const getPosition = (config: Config): WatermarkPosition => config.watermarkPosition || 'bottom';

/**
 * Creates a single watermark text node for the given position.
 */
const createWatermarkText = (text: string, position: WatermarkPosition): HTMLDivElement => {
  const element = document.createElement('div');
  element.className = WATERMARK_CLASS;
  element.dataset.position = position;
  element.setAttribute('aria-hidden', 'true');
  element.textContent = text;
  return element;
};

/**
 * Injects (or refreshes) the watermark inside a fixed page container. Must run
 * AFTER the page HTML is set, because setting `innerHTML` wipes any previous
 * child. No-op when no watermark text is configured.
 * @param container Fixed page container node
 * @param config Viewer config
 */
export const applyFixedPageWatermark = (container: HTMLElement, config: Config): void => {
  const existing = container.querySelector(`:scope > .${WATERMARK_CLASS}`);
  if (existing) {
    existing.remove();
  }
  const text = config.watermarkText;
  if (!text) {
    return;
  }
  container.appendChild(createWatermarkText(text, getPosition(config)));
};

/**
 * Creates the flow watermark layer node (empty). Returns `undefined` when no
 * watermark text is configured so callers can skip storing it.
 * @param config Viewer config
 */
export const createFlowWatermarkLayer = (config: Config): HTMLDivElement | undefined => {
  if (!config.watermarkText) {
    return undefined;
  }
  const layer = document.createElement('div');
  layer.className = WATERMARK_LAYER_CLASS;
  return layer;
};

/**
 * Rebuilds the per-page (per-column) watermarks inside the flow layer. Called
 * from `recalculate` once the column metrics are known.
 * @param state Viewer state
 * @param params Layout metrics
 */
export const updateFlowWatermark = (
  state: State,
  params: { scrollMode: ScrollModes; columns: number; containerHeight: number },
): void => {
  const { watermarkLayerNode } = state;
  const text = state.config.watermarkText;
  if (!watermarkLayerNode || !text) {
    return;
  }

  watermarkLayerNode.innerHTML = '';
  const position = getPosition(state.config);
  const count = Math.max(1, Math.ceil(params.columns));

  for (let i = 0; i < count; i++) {
    const slot = document.createElement('div');
    slot.className = WATERMARK_SLOT_CLASS;
    if (params.scrollMode === 'horizontal') {
      // One slot per column, sized to the live column width.
      slot.style.left = `calc(${i} * var(--total-column-width))`;
      slot.style.top = '0';
      slot.style.width = 'var(--total-column-width)';
      slot.style.height = '100%';
    } else {
      // Vertical scroll: one slot per viewport-height segment.
      slot.style.left = '0';
      slot.style.top = `${i * params.containerHeight}px`;
      slot.style.width = '100%';
      slot.style.height = `${params.containerHeight}px`;
    }
    slot.appendChild(createWatermarkText(text, position));
    watermarkLayerNode.appendChild(slot);
  }
};
