// Call this function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize pagination for the first table
    paginate('table-td', 'pagination-controls', 10);
  
    // Initialize pagination for the second table
    paginate('table-hs', 'pagination-controls-2', 10);
  });
  
  function paginate(tableId, controlsId, rowsPerPage) {
    var table = document.getElementById(tableId);
    if (!table) {
        // console.error('Table with id ' + tableId + ' is not found in the document');
        return;
    }
    var tbody = table.getElementsByTagName('tbody')[0];
    if (!tbody) {
        // console.error('Table body is not found in the table with id ' + tableId);
        return;
    }
    var rows = tbody.getElementsByTagName('tr');
    var pageCount = Math.ceil(rows.length / rowsPerPage);
  
    // Clear existing controls
    var controls = document.getElementById(controlsId);
    if (!controls) {
        // console.error('Controls with id ' + controlsId + ' is not found in the document');
        return;
    }
    controls.innerHTML = '';
  
    // Create the pagination controls
    for (var i = 0; i < pageCount; i++) {
      var btn = document.createElement('button');
      btn.innerText = i + 1;
      btn.classList.add('border', 'px-2', 'py-1', 'hover:bg-[#17A1FA]','hover:text-[#fff]','w-[20px]');
      btn.addEventListener('click', (function(page) {
        return function() {
          showPage(tableId, page, rowsPerPage);
        };
      })(i));
      controls.appendChild(btn);
    }
  
    // Show the first page
    showPage(tableId, 0, rowsPerPage);
}
  
  function showPage(tableId, page, rowsPerPage) {
    var table = document.getElementById(tableId);
    if (!table) {
        // console.error('No table found with id:', tableId);
        return;
    }

    var tbody = table.getElementsByTagName('tbody')[0];
    if (!tbody) {
        // console.error('No tbody found in table with id:', tableId);
        return;
    }

    var rows = tbody.getElementsByTagName('tr');
    
    for (var i = 0; i < rows.length; i++) {
      rows[i].style.display = (Math.floor(i / rowsPerPage) == page) ? '' : 'none';
    }
}
  