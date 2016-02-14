<html>

	<head>
		<title>Soundboard</title>

		<base href="<?php echo dirname($_SERVER['PHP_SELF']); ?>/" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<style type="text/css">
			body {
				padding: 0;
				margin: 0;
			}
		Voronoi {
			display: block;
			width: 100vw;
			height: 100vh;
			background: #DADADA;
		}

		</style>
	</head>

	<body>
		<my-app>App is loading...</my-app>
		
		<script src="app/libs/two.js"></script>
		<script src="app/libs/rhill-voronoi-core.js"></script>
		<script src="bundle.js"></script>
	</body>

</html>
