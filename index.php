<!DOCTYPE html>
<html lang="en">
<?php require_once('components/header.php') ?>
<!-- Content -->

<body>
  <header>
    <div class="container">
      <h1>PWA<br />To Do List</h1>
    </div>
  </header>

  <main>
    <div class="container">
      <nav>
        <ul>
          <li><a class="nav-link" href="notes.php">Change to notes</a></li>
        </ul>
      </nav>
    </div>


    <div class="container">
      <div class="box add-new">
        <form action="" id="todo-form">
          <div class="form-item">
            <label for="todo_name">Enter your task</label>
            <input type="text" name="todo_name" value="" id="todo_name" />
            <div class="error-message no-display">
              <p>The input field is empty. Fill in your task to add it to the todo list.</p>
            </div>
          </div>

          <div class="form-item">
            <input type="submit" value="Save" name="submit" />
          </div>
        </form>
      </div>
      <!--  Display Todos -->
      <div class="box todo-list">
        <h2>To do</h2>
        <div class="todos-box">
          <!-- Todos will be displayed here -->

          <!-- Placehoder -->
        </div>
        <div class="todo-list-placeholder">
          <h3>You have not listed your todos yet.</h3>
          <p>Get started and get them done!</p>
        </div>
      </div>
    </div>
  </main>
  <script src="js/main.js"></script>
  <script src="js/form.js"></script>
</body>

</html>