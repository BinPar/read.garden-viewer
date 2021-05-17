import { LayoutTypes } from '../../model/state';

export type ResourceTypes = 'video' | 'image' | 'doc' | 'interactive' | 'link';

export interface ContentFile {
  // Html ofuscado
  file: string;
  // virtual pages (flow) en fixed se contiene a si misma
  labels: string[];
  // Css ofuscado
  cssUrl?: string;
  // URL thumb
  thumbUrl?: string;
  // Page width
  width?: number;
  // Page height
  height?: number;
  // Background image URL
  bgUrl?: string;
}

export interface Target {
  src: string;
  label?: string;
  uri?: string;
}

export interface SpineNode {
  title: string;
  target: Target;
  resources?: string[];
  children?: SpineNode[];
  hasResources?: ResourceTypes[];
}

export interface ResourceData {
  label: string;
  pageNumber: number;
  target: Target;
  src: string;
  type: ResourceTypes;
  description: string;
  slug: string;
  thumbs: string[];
  title: string;
}

export interface Content {
  title: string;
  isbn: string;
  slug: string;
  initialContentSlug: string;
  cssURL: string;
  type: LayoutTypes;
  contents: ContentFile[];
  spine: SpineNode[];
  resourceTypes: ResourceTypes[];
}