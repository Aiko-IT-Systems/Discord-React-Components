# discord-system-message

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                                        | Type                                                                                                           | Default                 |
| ------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `channelName` | `channel-name` | Whether this message is to show channel name changes, used to match Discord's style.                                                                                               | `boolean`                                                                                                      | `false`                 |
| `timestamp`   | `timestamp`    | The timestamp to use for the message date.                                                                                                                                         | `Date \| null \| number \| string`                                                                             | `new Date()`            |
| `twentyFour`  | `twenty-four`  | Whether to use 24-hour format for the timestamp.                                                                                                                                   | `boolean`                                                                                                      | `useTwentyFourHourMode` |
| `type`        | `type`         | The type of system message this is, this will change the icon shown. Valid values: `join`, `leave`, `call`, `missed-call`, `boost`, `edit`, `thread`, `pin`, `alert`, and `error`. | `"alert" \| "boost" \| "call" \| "edit" \| "error" \| "join" \| "leave" \| "missed-call" \| "pin" \| "thread"` | `'join'`                |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
