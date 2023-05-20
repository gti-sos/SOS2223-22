<script>
    // Client id 6gbm2co1uuv6ixnsjljl5bkq6yyycd
    //Client Secret ryi0zhdy6x9n3e9dtt5kh91ijwi9d5
    //Playlist id B08HCKP6ZP ,B08NFDW82R ,B08NFBBVRM
    // @ts-nocheck
    import { onMount } from "svelte";
    import { Button, Table, Form, FormGroup, Label, Input } from "sveltestrap";
    import Header from "../Header.svelte";
    let datam = [];
    var client_id = "";
    var client_secret = "";
    var access_token;
    var refresh_token;
  
    const auth = "https://id.twitch.tv/oauth2/authorize";
    const token = "https://id.twitch.tv/oauth2/token";
    let redirect_uri = "https://sos2223-22.appspot.com/twitch_api";
    let response;
    let code;
  
    let playlistId;
  
    onMount(async () => {
      LocalStorageCharger();
    });
  
    async function LocalStorageCharger() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get("code");
      client_id = localStorage.getItem("client_id");
      client_secret = localStorage.getItem("client_secret");
      playlistId = localStorage.getItem("playlistId");
  
      if (code) {
        asignacion_code();
    
      } else {
        access_token = localStorage.getItem("access_token");
        if (access_token) {
          getCanciones();
        }
      }
    }
  
    async function getAuth() {
      localStorage.setItem("client_id", client_id);
      localStorage.setItem("client_secret", client_secret);
      localStorage.setItem("playlistId", playlistId);
  
      const authParams = new URLSearchParams({
        client_id: client_id,
        response_type: "code",
        redirect_uri: redirect_uri,
      });
  
      let authUrl = `${auth}?${authParams.toString()}`;
      window.location.href = authUrl;
    }
  
    async function asignacion_code() {
      console.log("Entra en code");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get("code");
      if (code) {
        getToken();
      }
    }
  
    async function getToken() {
   
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get("code");
      const grantType = "authorization_code";
  
      const postData = `client_id=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=${grantType}&redirect_uri=${redirect_uri}`;
      console.log(datam);
      response = await fetch(token, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: postData,
      });
  
      const data = await response.json();
      access_token = data.access_token;
      refresh_token = data.refresh_token;
  
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
  
      getCanciones();
    }
  
    async function getCanciones() {
      const authToken = access_token;
      const responsePlaylist = await fetch(
        `https://api.twitch.tv/helix/soundtrack/playlist?id=${playlistId}`,
        {
          headers: {
            "Client-ID": client_id,
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      let datos = await responsePlaylist.json();
      datam = datos.data;
    }
  </script>
  
  <main>
    <Header></Header>
    <h1>API Twitch</h1>
    <div>
      <Form class="custom-form">
        <FormGroup>
          <Label for="clientId">Id del cliente:</Label>
          <Input type="text" name="text" id="clientId" bind:value={client_id} />
        </FormGroup>
        <FormGroup>
          <Label for="clientSecret">Key del cliente:</Label>
          <Input type="text" name="text" id="clientSecret" bind:value={client_secret} />
        </FormGroup>
        <FormGroup>
          <Label for="playlistId">Playlist ID:</Label>
          <Input type="text" name="text" id="playlistId" bind:value={playlistId} />
        </FormGroup>
        <div class="button-container">
          <Button color="primary" on:click={getAuth}>Pedir autorización</Button>
          <Button color="primary" on:click={getCanciones}>Actualizar playlist</Button>
        </div>
      </Form>
  
      <div class="ImageContainer">
        {#each datam as dato}
          <div class="ImageBox">
            <img class="Image" src={dato.album.image_url} alt={dato.album.name} />
            <a class="Title" href="">{dato.album.name}</a>
          </div>
        {/each}
      </div>
    </div>
  </main>
  
  <style>
    h1 {
      text-align: center;
      margin-top: 40px;
    }
  
    .custom-form {
      max-width: 400px;
      margin: 0 auto;
    }
  
    .button-container {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  
    .ImageContainer {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  
    .ImageBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px;
      width: 200px;
    }
  
    .Image {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
    }
  
    .Title {
      margin-top: 5px;
      font-size: 18px;
      text-decoration: none;
      color: #333;
      text-align: center;
    }
  </style>
  