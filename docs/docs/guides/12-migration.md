---
title: Migration from Paper 5.x to 6.x
---

TBC

## Component and types

The Paper text field is renamed. Use **`TextField`** and the **`TextFieldProps`** type instead of **`TextInput`** / **`TextInputProps`**.

```tsx
import { TextField, type TextFieldProps } from 'react-native-paper';
```

## Visual / variant

- **`mode="flat"`** → **`variant="filled"`**
- **`mode="outlined"`** → **`variant="outlined"`**

```tsx
// Before (v5)
<TextInput mode="flat" label="Filled" />
<TextInput mode="outlined" label="Outlined" />

// After (v6)
<TextField variant="filled" label="Filled" />
<TextField variant="outlined" label="Outlined" />
```

## Icons and adornments

- **`left` / `right`** → **`StartAccessory` / `EndAccessory`**
- **`TextInput.Icon`** → **`TextField.Icon`**
- **`TextInput.Affix`** → **`prefix` / `suffix`**, or **`TextInput.Icon`**, or **`StartAccessory` / `EndAccessory`**

```tsx
// Before (v5)
<TextInput
  left={<TextInput.Icon icon="email" />}
  right={<TextInput.Affix text={`${value.length}/80`} />}
/>

// After (v6)
<TextField
  StartAccessory={(p) => <TextField.Icon {...p} icon="email" />}
  EndAccessory={(p) => <CustomComponent {...p} />}
  maxLength={100}
  prefix={"$"}
  suffix={"/100"}
  counter
/>
```

## Label, helper, error, disabled

- **`label: React.Element | string`** → **`string`**
- **`error` / `disabled`** → **`status="error"` / `status="disabled"`** or **`status={['error','disabled']}`** when both apply.
- **`HelperText`** was removed; use **`supportingText`**.

```tsx
// Before (v5)
<>
  <TextInput
    label="Email"
    error={hasError}
    disabled={isDisabled}
  />
  <HelperText type="error" visible={hasError}>
    Enter a valid email
  </HelperText>
</>

// After (v6)
<TextField
  label="Email"
  labelProps={{ maxFontSizeMultiplier: 1.2 }}
  status={['error', 'disabled']}
  supportingText={'Enter a valid email'}
/>
```

## Styling / behavior removed

No direct `TextField` equivalents for:

- **`dense`**, **`contentStyle`**, **`outlineStyle`**, **`underlineStyle`**
- **`underlineColor`**, **`activeUnderlineColor`**, **`outlineColor`**, **`activeOutlineColor`**, **`textColor`**
- **`render`**

Prefer **`fieldStyle`**, **`containerStyle`**, **`pressableStyle`**, **`style`** on the inner input, and the theme.

```tsx
import { MD3LightTheme, TextField, TextInput } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    outline: '#79747E',
    primary: '#6750A4',
  },
};

// Before (v5)
<TextInput
  dense
  contentStyle={{
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
  }}
  outlineStyle={{
    borderRadius: 12,
    borderWidth: 2,
  }}
  outlineColor="#79747E"
  activeOutlineColor="#6750A4"
  textColor="#1C1B1F"
  style={{ fontSize: 16 }}
/>

// After (v6)
<TextField
  theme={theme}
  containerStyle={{
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
  }}
  fieldStyle={{
    borderRadius: 12,
    borderWidth: 2,
  }}
  style={{ fontSize: 16, color: '#1C1B1F' }}
/>
```
