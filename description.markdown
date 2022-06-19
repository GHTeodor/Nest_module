User API

## WebSocket

**HOST** `http://localhost:3000`

---

### Listen for join in S0cket

---

Event: `join-in-room`

Data:
|Property | Description |
|-----------------------|
|`token` | Auth token of user|
|`id`| Id of S0cket |

Example:
```angular2html
token: Bearer eyJhbGciO[...].eyJlbWFpbCI6[...].M8MsXUd9T7t[...]
time: 2022-06-1*
id: join
```