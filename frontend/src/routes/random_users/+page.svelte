<script>
    // @ts-ignore
    /**
     * @type {string | any[]}
     */
    let users = [];
    let numUsers = 5;
  
    async function fetchUsers() {
      try {
        const response = await fetch(`https://randomuser.me/api/?results=${numUsers}`);
        const data = await response.json();
        users = data.results;
      } catch (error) {
        console.error(error);
      }
    }
  
    function reloadUsers() {
      fetchUsers();
    }
  </script>
  
  <main>
    <h1>Usuarios Aleatorios</h1>
  
    <div class="controls">
      <label for="numUsers">Número de usuarios:</label>
      <input type="number" id="numUsers" bind:value={numUsers} min="1" max="10" />
  
      <button on:click={reloadUsers}>Generar</button>
    </div>
  
    {#if users.length > 0}
      <ul class="user-list">
        {#each users as user}
          <li class="user-item">
            <img src={user.picture.thumbnail} alt={user.name.first} />
            <p>{user.name.first} {user.name.last}</p>
          </li>
        {/each}
      </ul>
    {:else}
      <p>Loading...</p>
    {/if}
  </main>
  
  <style>
    main {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
  
    h1 {
      text-align: center;
      margin-bottom: 20px;
    }
  
    ul {
      list-style: none;
      padding: 0;
    }
  
    .user-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  
    .user-item {
      flex: 0 0 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px;
    }
  
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
  
    .controls {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
  
    label {
      margin-right: 10px;
    }
  
    input {
      width: 50px;
      padding: 5px;
    }
  
    button {
      padding: 5px 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
  