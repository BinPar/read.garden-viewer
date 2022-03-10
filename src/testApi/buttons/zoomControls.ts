import { SetFitMode, SetZoom } from '../../model/actions/fixed';
import { AddOnChangeEvent } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';
import { FitMode, LayoutTypes } from '../../model/viewerSettings';

const zoomControls = async (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): Promise<void> => {
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = `${state.config.zoom.min * 100}`;
  slider.max = `${state.config.zoom.max * 100}`;
  slider.step = '1';

  const onChange = (): void => {
    const zoom = parseInt(slider.value, 10) / 100;
    if (zoom) {
      const action: SetZoom = {
        type: 'setZoom',
        zoom,
      };
      dispatcher(action).catch((ex) => {
        const { stack, message } = ex as Error;
        console.error('Error dispatching action', stack || message);
      });
    }
  };

  slider.onchange = onChange;

  const sliderWrapper = document.createElement('div');
  sliderWrapper.appendChild(slider);

  container.appendChild(sliderWrapper);

  const valuesControls = document.createElement('div');

  const decreaseButton = document.createElement('button');
  decreaseButton.innerText = '-';

  const increaseButton = document.createElement('button');
  increaseButton.innerText = '+';

  const valueHolder = document.createElement('span');
  valueHolder.classList.add('zoom-value');

  // valuesControls.appendChild(decreaseButton);
  valuesControls.appendChild(valueHolder);
  // valuesControls.appendChild(increaseButton);

  const onZoomChange: AddOnChangeEvent<number> = {
    type: 'addOnChangeEvent',
    propertyName: 'zoom',
    event: (newValue) => {
      const zoom = Math.round(newValue * 100);
      slider.value = `${zoom}`;
      valueHolder.innerText = `${zoom}%`;
    },
  };

  container.appendChild(valuesControls);

  const onFitHeight = (): void => {
    const action: SetFitMode = {
      type: 'setFitMode',
      fitMode: FitMode.Height,
    };
    dispatcher(action).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error dispatching action', stack || message);
    });
  };

  const fitHeight = document.createElement('button');
  fitHeight.innerText = 'Fit height';
  fitHeight.onclick = onFitHeight;
  if (state.layout === LayoutTypes.Fixed && state.fitMode === FitMode.Height) {
    fitHeight.classList.add('active');
  }

  const onFitWidth = (): void => {
    const action: SetFitMode = {
      type: 'setFitMode',
      fitMode: FitMode.Width,
    };
    dispatcher(action).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error dispatching action', stack || message);
    });
  };

  const fitWidth = document.createElement('button');
  fitWidth.innerText = 'Fit width';
  fitWidth.onclick = onFitWidth;
  if (state.layout === LayoutTypes.Fixed && state.fitMode === FitMode.Width) {
    fitWidth.classList.add('active');
  }

  const onFitPage = (): void => {
    const action: SetFitMode = {
      type: 'setFitMode',
      fitMode: FitMode.Page,
      center: true,
    };
    dispatcher(action).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error dispatching action', stack || message);
    });
  };

  const fitPage = document.createElement('button');
  fitPage.innerText = 'Fit page';
  fitPage.onclick = onFitPage;
  if (state.layout === LayoutTypes.Fixed && state.fitMode === FitMode.Page) {
    fitWidth.classList.add('active');
  }

  const onFitModeChange: AddOnChangeEvent<FitMode | undefined> = {
    type: 'addOnChangeEvent',
    propertyName: 'fitMode',
    event: (newValue) => {
      fitWidth.classList.remove('active');
      fitHeight.classList.remove('active');
      fitPage.classList.remove('active');
      if (newValue === FitMode.Height) {
        fitHeight.classList.add('active');
      }
      if (newValue === FitMode.Width) {
        fitWidth.classList.add('active');
      }
      if (newValue === FitMode.Page) {
        fitPage.classList.add('active');
      }
    },
  };
  await dispatcher(onFitModeChange);
  await dispatcher(onZoomChange);

  container.appendChild(fitHeight);
  container.appendChild(fitWidth);
  container.appendChild(fitPage);
};

export default zoomControls;
