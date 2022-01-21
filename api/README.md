# API Documentation

## Endpoints
`/lockers` -- returns all lockers
`/lockers/available?locker_group=[general, graduate, faculty]&locker_size=[cubby, mid, full, '']` -- returns one available locker based on the provided query parameters. `locker_group` is required, `locker_size` is not.