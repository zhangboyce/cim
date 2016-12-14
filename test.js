
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

let obj = {
    o1: { name: 'on1', value: 'ov1' },
    o2: { name: 'on2', value: 'ov2' },
    o3: { name: 'on3', value: 'ov3' },
    o4: { name: 'on4', value: 'ov4' },
    o5: { name: 'on5', value: 'ov5' }
};


var token = jwt.sign({userName: 'boyce'}, 'cim-auth-secret-key');

console.log(token);

//let decoded = jwt.verify(token, 'cim-auth-secret-key');

let decoded = jwtDecode('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InJlZ2lzdGVyVGltZSI6ImluaXQiLCJfX3YiOiJpbml0IiwibW9iaWxlIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsIm5hbWUiOiJpbml0IiwiY29sdW1uTmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsInJlZ2lzdGVyVGltZSI6dHJ1ZSwibW9iaWxlIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiZW1haWwiOnRydWUsIm5hbWUiOnRydWUsImNvbHVtbk5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJyZWdpc3RlclRpbWUiOiIyMDE2LTEyLTEzVDAyOjU4OjEwLjMxM1oiLCJfX3YiOjAsIm1vYmlsZSI6IjEzMjIyMjIyMjIyIiwicGFzc3dvcmQiOiI0NmY5NGM4ZGUxNGZiMzY2ODA4NTA3NjhmZjFiN2YyYSIsImVtYWlsIjoiemhhbmdib3ljZTJAZ21haWwuY29tIiwibmFtZSI6IkJveWNlMiIsImNvbHVtbk5hbWUiOiJDb2x1bW4xIiwiX2lkIjoiNTg0ZjYzYzI0ZDc1MGYxMDExYjYwOWMxIn0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGxdLCIkX19vcmlnaW5hbF92YWxpZGF0ZSI6W251bGxdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltdfSwiaWF0IjoxNDgxNzA0MDM5fQ.u18phCasTh8Jhz5dj2J59qme0a0RgBEOD4RIK0Mvqmg');

console.log(decoded);