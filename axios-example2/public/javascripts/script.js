document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!');
  },
  false
);

// getting with fetch
// function performGetRequest1() {
//   var resultElement = document.getElementById('getResult1');
//   resultElement.innerHTML = '';

//   fetch('http://jsonplaceholder.typicode.com/todos')
//     .then(res => {
//       // console.log('Output for: res', res);
//       return res.json();
//     })
//     .then(json => {
//       resultElement.innerHTML = generateSuccessHTMLOutput(json);
//     })
//     .catch(err => {
//       console.log(err);
//       resultElement.innerHTML = generateErrorHTMLOutput(err);
//     });
// }

function performGetRequest1() {
  var resultElement = document.getElementById('getResult1');
  resultElement.innerHTML = '';

  axios
    .get('http://jsonplaceholder.typicode.com/todos')
    .then(function(response) {
      // console.log("Output for: response", response)
      resultElement.innerHTML = generateSuccessHTMLOutput(response);
    })
    .catch(function(error) {
      resultElement.innerHTML = generateErrorHTMLOutput(error);
    });
}

function generateSuccessHTMLOutput(response) {
  //return for the fetch example
  // return (
  //   '<h5>Data:</h5>' + '<pre>' + JSON.stringify(response, null, '\t') + '</pre>'
  // );
  return (
    '<h4>Result:</h4>' +
    '<h5>Status:</h5>' +
    '<pre>' +
    response.status +
    ' ' +
    response.statusText +
    '</pre>' +
    '<h5>Headers:</h5>' +
    '<pre>' +
    JSON.stringify(response.headers, null, '\t') +
    '</pre>' +
    '<h5>Data:</h5>' +
    '<pre>' +
    JSON.stringify(response.data, null, '\t') +
    '</pre>'
  );
}

function generateErrorHTMLOutput(error) {
  return (
    '<h4>Result:</h4>' +
    '<h5>Message:</h5>' +
    '<pre>' +
    error.message +
    '</pre>' +
    '<h5>Status:</h5>' +
    '<pre>' +
    error.response.status +
    ' ' +
    error.response.statusText +
    '</pre>' +
    '<h5>Headers:</h5>' +
    '<pre>' +
    JSON.stringify(error.response.headers, null, '\t') +
    '</pre>' +
    '<h5>Data:</h5>' +
    '<pre>' +
    JSON.stringify(error.response.data, null, '\t') +
    '</pre>'
  );
}

function performGetRequest2() {
  var resultElement = document.getElementById('getResult2');
  var todoId = document.getElementById('todoId').value;
  resultElement.innerHTML = '';

  axios
    .get('http://jsonplaceholder.typicode.com/todos', {
      params: {
        id: todoId,
      },
    })
    .then(function(response) {
      resultElement.innerHTML = generateSuccessHTMLOutput(response);
    })
    .catch(function(error) {
      resultElement.innerHTML = generateErrorHTMLOutput(error);
    });
}

//submit button
document
  .getElementById('todoInputForm')
  .addEventListener('submit', performPostRequest);

function performPostRequest(e) {
  var resultElement = document.getElementById('postResult');
  var todoTitle = document.getElementById('todoTitle').value;
  resultElement.innerHTML = '';

  axios
    .post('http://jsonplaceholder.typicode.com/todos', {
      userId: '1',
      title: todoTitle,
      completed: false,
    })
    .then(function(response) {
      resultElement.innerHTML = generateSuccessHTMLOutput(response);
    })
    .catch(function(error) {
      resultElement.innerHTML = generateErrorHTMLOutput(error);
    });
  e.preventDefault();
}

function clearOutput() {
  var resultElement = document.getElementById('getResult1');
  resultElement.innerHTML = '';
  var resultElement = document.getElementById('getResult2');
  resultElement.innerHTML = '';
  var resultElement = document.getElementById('postResult');
  resultElement.innerHTML = '';
}
