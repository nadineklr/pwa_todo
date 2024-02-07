<!DOCTYPE html>
<html lang="en">
<?php require_once('components/header.php') ?>
<!-- Content -->

<body>
    <header>
        <div class="container">
            <h1>PWA<br />Notes</h1>
        </div>
    </header>

    <main>
        <div class="container">
            <nav>
                <ul>
                    <li><a class="nav-link" href="index.php">Change to list</a></li>
                </ul>
            </nav>
        </div>


        <div class="container">
            <div class="box add-new">
                <form action="" id="notes-form">
                    <div class="form-item">
                        <label for="notes">Enter your notes</label>
                        <textarea name="notes" id="notes"></textarea>

                    </div>
                </form>
            </div>

        </div>
    </main>
    <script src="js/main.js"></script>
    <script src="js/notes.js"></script>
</body>

</html>