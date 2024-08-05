const accessToken = ''


const client_id = ''
const client_secret = ''

const redirect_uri = 'https://google.com'
const track_id = '739WUU1tPFLO4x4HJq561K'
const user_id = '12wtqqqwt0ggep77eptv79943'
const playlist_id = '2B7ub9WVloFyHOjFZ0bp4P'
const credentials = ''
const encodedCredentials = Buffer.from(credentials).toString('base64');

async function get_token() {
  const body = 'grant_type=client_credentials'
  await fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST',
    form: {
      code: 'code',
      redirect_uri: redirect_uri,
      grant_type: 'authorizaclition_code'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'grant_type': 'client_credentials',
      'Authorization': 'Basic ' + encodedCredentials,
    },

    body: body
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
}

async function get_playlist() {
  return await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
    methood: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + accessToken

    },
  })
    // .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
}

async function login() {
  return await fetch(`https://accounts.spotify.com/authorize?`, {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      // code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + encodedCredentials
    },
    json: true
  })
    // .then(response => response.json())
    .then(data => data.json())
    .catch(err => console.log(err))
}


async function create_playlist() {
  return await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
      // 'cliend_id': client_id,
    },
    body: {
      "name": "New Playlist",
      "description": "New playlist description",
      "public": true
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

async function add_track() {
  // await login()
  return await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + encodedCredentials//'Bearer ' + accessToken,
    },
    body: {
      "uris": [
        `spotify:track:${track_id}`
      ],
      "position": 0
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

async function async_caller() {
  const toekn = await create_playlist()
  console.log(toekn)
}

async_caller()
