<script>
    import Header from "./Header.svelte";
</script>

<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Information</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        /* Estilos generales */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
        }

        h1, h2 {
            color: #333;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }

        a:hover {
            color: #0056b3;
        }

        /* Estilos para las secciones */
        .team-members,
        .project-details {
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f8f9fa;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .team-members ul,
        .project-details ul {
            list-style-type: none;
            padding: 0;
        }

        .team-member {
            padding: 0.5rem 0;
        }

        /* Estilos para el pie de página */
        footer {
            padding: 1rem 0;
            background-color: #f8f9fa;
            border-top: 1px solid #ccc;
        }

        footer p {
            font-size: 0.9rem;
            color: #333;
        }
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>

<body>
    <br>
    <Header></Header>
    <div class="container">
        <header>
            <h1 class="text-center my-5">Equipo:</h1>
        </header>
        <main>
            <div class="row">
                <div class="col-md-6">
                    <section class="team-members">
                        <h2>Miembros</h2>
                        <ul>
                            <li class="team-member">Antonio Carranza Barroso (fuente: jobs-companies-innovation)</li>
                            <li class="team-member">Video Antonio Carranza: <a href="https://www.youtube.com/watch?v=36Jb9cW7ncc" target="_blank">Video</a></li>
                            <li class="team-member">Carlos Gata Masero (fuente: ict-promotion-strategy)</li>
                            <li class="team-member">Video Carlos Gata: <a href="https://www.youtube.com/watch?v=Ul9tZyh52-E" target="_blank">Video</a></li>
                            <li class="team-member">Thomas Tejeda Gordon</li>
                            <li class="team-member">Rubén González Amador</li>
                        </ul>
                    </section>
                </div>
                <div class="col-md-6">
                    <section class="project-details">
                        <h2>Detalles del Proyecto</h2>
                        <p><strong>Descripcion del proyecto:</strong>Nuestras fuentes de información están dirigidas a analizar el incremento del empleo industrial en Andalucía, y la siniestralidad.</p>
                        <p><strong>Repositorio:</strong> <a href="https://github.com/gti-sos/SOS2223-22" target="_blank">gti-sos/SOS2223-22</a></p>
                        <p><strong>URL:</strong> <a href="https://sos2223-22.appspot.com/" target="_blank">https://sos2223-22.appspot.com/</a></p>
                        <p><strong>Documentacion de APIS:</strong></p>
                        <ul>
                            
                            <li><a href="https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats/docs" target="_blank">https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats/docs</a> ( v2 - desarrollada por Antonio Carranza Barroso )</li>
                            <li><a href="https://sos2223-22.appspot.com/api/v1/jobs-companies-innovation-stats/docs" target="_blank">https://sos2223-22.appspot.com/api/v1/jobs-companies-innovation-stats/docs</a> (v1 - desarrollada por  Antonio Carranza Barroso)</li>
                            <li><a href="https://sos2223-22.appspot.com/api/v1/ict-promotion-strategy-stats/docs" target="_blank">https://sos2223-22.appspot.com/api/v1/ict-promotion-strategy-stats/docs</a> (v1 - desarrollada por Carlos Gata Masero)</li>
                            <li><a href="https://sos2223-22.appspot.com/api/v2/ict-promotion-strategy-stats/docs" target="_blank">https://sos2223-22.appspot.com/api/v2/ict-promotion-strategy-stats/docs</a> (v2 - desarrollada por Carlos Gata Masero)</li>

                        </ul>
                        <p><strong>Frontends:</strong></p>
                        <ul>
                           
                            <li> <li><a href="https://sos2223-22.appspot.com/frontAcb" target="_blank">Frontend Antonio </li>
                            <li> <li><a href="https://sos2223-22.appspot.com/frontCgm" target="_blank">Frontend Carlos </li>

                        </ul>
                        <p><strong>URLs Base:</strong></p>
                        <ul>
                            <li>Antonio Carranza Barroso, API V1 - <a href="https://sos2223-22.appspot.com/api/v1/jobs-companies-innovation-stats" target="_blank">https://sos2223-22.appspot.com/api/v1/jobs-companies-innovation-stats</a></li>
                            <br>
                            <li>Antonio Carranza Barroso, API V2 - <a href="https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats" target="_blank">https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats</a></li>
                            <br>
                            <li>Carlos Gata Masero - <a href="https://sos2223-22.appspot.com/api/v2/ict-promotion-strategy-stats" target="_blank">https://sos2223-22.appspot.com/api/v1/ict-promotion-strategy-stats</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    </div>

    <footer class="container mt-5">
        <div class="row">
            <div class="col-md-12 text-center">
                <p>&copy; 2023 All rights reserved. Project Information.</p>
            </div>
        </div>
    </footer>
</body>

</html>

