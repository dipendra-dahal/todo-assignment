import { Task } from "./Tasks.js";

class Todos {
  #tasks = [];
  #backend_url = "";

  constructor(url) {
    this.#backend_url = url;
  }

  getTasks = () => {
    return new Promise(async (resolve, reject) => {
      fetch(this.#backend_url)
        .then((response) => response.json())
        .then(
          (json) => {
            this.#readJson(json);
            resolve(this.#tasks);
          },
          (error) => {
            reject(error);
          }
        );
    });
  };
  addTask = (text) => {
    return new Promise(async (resolve, reject) => {
      fetch(`${this.#backend_url}/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: text }),
      })
        .then((response) => response.json())
        .then(
          (json) => {
            resolve(this.#addToArray(json.id, json.description));
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

  #readJson = (taskAsjson) => {
    taskAsjson.forEach((node) => {
      const task = new Task(node.id, node.description);
      this.#tasks.push(task);
    });
  };

  #addToArray = (id, text) => {
    const task = new Task(id, text);
    this.#tasks.push(task);
    return task;
  };

  #removeTaskFromArray = (id) => {
    this.#tasks = this.#tasks.filter(task => task.id !== id);
  };
  removeTask = (id) => {
    return new Promise(async (resolve, reject) => {
      fetch(this.#backend_url + '/delete/' + id, {
        method: 'DELETE'
      })
      .then((response) => response.json())
      .then((json) => {
        // Call the new private method to remove task from array
        this.#removeTaskFromArray(id);
        resolve(json.id);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

}

export { Todos };
