# lab-14-mini-project

## Events

- NEW_TICKET

  - EMIT: Student asks for help
  - ON: If TA is available, emit HELPING, if not, store ticket in the ticketQueue

- HELPING
Only emit HELPING when TA is ready; otherwise continue to store NEW_TICKET in queue

  - EMIT: TA asks for the ticket info
  - ON: Sends ticket information

- COMPLETED

  - EMIT: TA emits READY
  - ON: Student thanks TA


## Simulation

Students: NEW_TICKET every 3 seconds
TAs: HELPING/COMPLETED every 10 seconds
