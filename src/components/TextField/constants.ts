import { PixelRatio, Platform } from 'react-native';

// ==================
// PLATFORM
// ==================
export const isWeb = Platform.OS === 'web';

export const fontScale = PixelRatio.getFontScale();

// =====================
// FIELD LAYOUT
// =====================
export const BASELINE_TEXT_FIELD_HEIGHT = 56;
export const BASELINE_TEXT_FIELD_PADDING_VERTICAL = 8;

export const TEXT_FIELD_INPUT_WRAPPER_PADDING_HORIZONTAL = 16;
export const TEXT_FIELD_ACCESSORY_MARGIN_HORIZONTAL = 12;

export const TEXT_FIELD_HEIGHT = BASELINE_TEXT_FIELD_HEIGHT * fontScale;
export const TEXT_FIELD_PADDING_VERTICAL =
  BASELINE_TEXT_FIELD_PADDING_VERTICAL * fontScale;

// ==================
// ACCESSORY
// ==================
export const ACCESSORY_SIZE = 24;

export const PREFIX_END_PADDING = 2;
export const SUFFIX_START_PADDING = 2;

export const ERROR_ICON_SIZE = 16;

// ===============
// TYPOGRAPHY
// ===============
export const LINE_HEIGHT_DELTA = 2;
export const INPUT_FONT_SIZE = 16;
export const ACTIVE_LABEL_FONT_SIZE = 12;
export const INACTIVE_LABEL_FONT_SIZE = INPUT_FONT_SIZE;
export const SUPPORTING_TEXT_FONT_SIZE = 12;

export const INACTIVE_LABEL_TOP_POSITION =
  ((BASELINE_TEXT_FIELD_HEIGHT -
    2 * BASELINE_TEXT_FIELD_PADDING_VERTICAL -
    INPUT_FONT_SIZE) /
    2 +
    BASELINE_TEXT_FIELD_PADDING_VERTICAL -
    LINE_HEIGHT_DELTA) *
  fontScale;

// =================
// HELPER TEXT LAYOUT
// =================
export const SUPPORTING_TEXT_MARGIN_TOP = 4;

// =========
// ANIMATION
// =========
export const ANIMATION_DURATION_MS = 150;

// =========
// INDICATOR
// =========
export const ACTIVE_INDICATOR_SIZE = 2;
export const INACTIVE_INDICATOR_SIZE = 1;

// ============
// SHAPE
// ============
export const TEXT_FIELD_BORDER_RADIUS = 4;

// ==================
// LABEL POSITIONING
// ==================
export const LABEL_START_OFFSET_WITHOUT_ACCESSORY =
  TEXT_FIELD_INPUT_WRAPPER_PADDING_HORIZONTAL;
