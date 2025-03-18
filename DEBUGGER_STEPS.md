# Debugger Steps

## Breakpoint 1: Form Submission Event

### Before

![screenshot](./1%20before.png)

Paused at `eventObject.preventDefault();` in `submit` event.
`eventObject` is captured, but `validateForm()` has not run yet.
Call stack shows in inside the `submit` listener.

### After

![screenshot](./1%20after.png)

I stepped over the line; `validateForm()` is about to be called.
`isValid` will soon hold the validation result.

## Breakpoint 2: Last Name Validation

### Before

![screenshot](./2%20before.png)

Paused at `if (!isNotEmpty(nameValue))`.

I can see that `nameValue` has been trimmed.
Call stack indicates we are inside `validateForm()`.

### After

![screenshot](./2%20after.png)

I stepped through the condition checks for `nameValue`.
If it fails (empty, too short, or has spaces), `showInputError()` is triggered.

## Breakpoint 3: Error Message Creation

### Before

![screenshot](./3%20before.png)

Paused at `const errorText = document.createElement("div");` in `showInputError()`.

I can see that `message` contains the text like "Name cannot be empty."
The code is about to create the `<div>` for displaying the error.

### After

![screenshot](./3%20after.png)

Now the `<div>` is created, assigned a class (`error-message`), and appended to the DOM.
The error message now appears next to the invalid input.

## Detailed Analysis: Breakpoint 2 (Before Step)

1. What does this state tell us?
We are checking the trimmed `nameValue` to ensure it meets our rules (non-empty, length >= 4, no spaces).
The debugger confirms the input’s value at this exact moment.

2. Is the program behaving as expected? Why or why not?
Yes, because if `nameValue` is invalid, we see the code preparing to call `showInputError()`.
This matches our intended validation logic.

3. How does this state connect to the program’s next steps?
If the Last Name fails validation, the form submission process is halted and an error is displayed.
If it passes, the code continues to validate the next input fields (Email, Gender, etc.), ensuring only valid data is submitted.
