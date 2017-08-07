import $ from "jquery";
import { ipcRenderer } from 'electron';

$(() => {
    $('#login').submit(() => {
      // send the ID to the main process
      ipcRenderer.send("login", $('#id').val());
      return false;
    });
});
