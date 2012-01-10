<!DOCTYPE html>
<html lang="fr-fr">
<head>
	<meta charset="utf-8" />
	<title>Franck Ernewein</title>
	<meta name="author" content="Franck Ernewein" />
	<style type="text/css">
		@import url(reset.css);
		@import url(style.css);
	</style>
	<script src="js/lib/jquery-1.7.1.min.js"></script>
    <script src="js/lib/jquery.randomize.js"></script>
	<script src="js/lib/underscore.js"></script>
	<script src="js/lib/backbone.js"></script>
    <script src="js/lib/processing-1.3.6.min.js"></script>
	<script src="js/model.js"></script>
	<script src="js/collection.js"></script>
	<script src="js/router.js"></script>
	<script src="js/view.js"></script>
	<script src="js/app.js"></script>
   <script>
        app.collection.sketchs.add( <?php include 'data/sketch.json'; ?>);
        app.collection.works.add( <?php include 'data/work.json'; ?>);
    </script>
    <script type="text/html" id="tpl-work"><?php include 'template/work.html'; ?></script>
    <script type="text/html" id="tpl-works"><?php include 'template/works.html'; ?></script>
    <script type="text/html" id="tpl-sketch"><?php include 'template/sketch.html'; ?></script>
    <script type="text/html" id="tpl-sketchs"><?php include 'template/sketchs.html'; ?></script>
    <script type="text/html" id="tpl-abouts"><?php include 'template/abouts.html'; ?></script>
</head>
<body>
<div id="global">
	<div class="fx-mask"></div>
	<div id="head">
		<hgroup>
			<h1><a href="#">Franck Ernewein</a></h1>
			<h2>Front end developper</h2>
		</hgroup>
	</div>
	<div id="content">
		<div id="nav">
			<ul>
				<li><a href="#sketch">Sketch</a></li>
				<li><a href="#work">Works</a></li>
				<li><a href="#about">About</a></li>
			</ul>
		</div>
		<div id="page"></div>
	</div>
</div>
</body>
</html>