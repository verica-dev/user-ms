## User microservice


### Get user by id

```markdown
# GET
`<base_url>/user/:userId`
```

### Get all users

```markdown
# GET
`<base_url>/user/all`
```

### Add user

```markdown
# POST
`<base_url>/user/add`

`{
    "user_id" : string,     - mandatory
    "first_name" : string,  - mandatory
    "last_name" : string,   - mandatory
    "email" : string,
    "phone" : string        - mandatory
 }`

```

### Delete user by id

```markdown
# DELETE
`<base_url>/user/:userId`
```

### Edit user

```markdown
# POST
`<base_url>/user/edit`

`{
    "user_id" : string,     - mandatory
    "first_name" : string,  
    "last_name" : string,   
    "email" : string,
    "phone" : string     
 }`

```
