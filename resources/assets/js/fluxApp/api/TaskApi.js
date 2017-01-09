// import 'babel-polyfill';
import 'whatwg-fetch';
import _ from 'lodash';

const API_URL = '/api';
const API_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-CSRF-TOKEN': window.Laravel.csrfToken,
  'Authorization': 'Bearer ' + window.Laravel.apiToken
};

const API_HEADERS_FILES = {
  'X-CSRF-TOKEN': window.Laravel.csrfToken,
  'Authorization': 'Bearer ' + window.Laravel.apiToken
}

let TaskAPI = {
  
  getInfo(getUrl, headers, cb) {
    return fetch(getUrl,
    {
      method: 'GET',
      credentials: 'same-origin',
      headers: headers
    })
    .then(function(response){ 
      return response.json();
    });
  },

  postInfo(postUrl, headers, postBody, cb) {
    return fetch(postUrl,
    {
      method: 'POST',
      credentials: 'same-origin',
      headers: headers,
      body: postBody
    })
    .then(function(response){ 
      return response.json();
    });
  },

  getTasks() {
    var getUrl = `${API_URL}/tasks`;
    return this.getInfo(getUrl, API_HEADERS, null);
  },

  addTask(task_name) {
    var postUrl = `${API_URL}/tasks`;
    return this.postInfo(postUrl, API_HEADERS, JSON.stringify(
      {name: task_name}
    ));
  },

  deleteList(id) {
    return fetch(`${API_URL}/tasks/${id}`,
    {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: API_HEADERS,
    })
    .then(function(response){ 
      return response.json();
    })
  },

  saveEditList(id, name) {
    return fetch(`${API_URL}/tasks/${id}`,
    {
      method: 'PUT',
      credentials: 'same-origin',
      headers: API_HEADERS,
      body: JSON.stringify({name: name})
    })
    .then(function(response){ 
      return response.json();
    })
  },

  saveFloorStockCaseType(floor_stock_case_id, floor_stock_case, cb) {
    var postUrl = `${API_URL}/floor_stock_case/${floor_stock_case_id}/floor_stock_case_type`;
    return this.postInfo(postUrl, API_HEADERS, JSON.stringify(floor_stock_case), cb);
  },

  
}
export default TaskAPI;