var PortletTools = function () {
    
  var orderTotal = function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'assets/json/profit_margin/order_detail.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    //console.log('json["order_overview"].["Total Lines"]'+json[0]["order_overview"]["Total Lines"]);
    $("#total_lines").text( json[0]["order_overview"]["Total Lines"]);
    $("#Contribution").text( json[0]["order_overview"]["Contribution"]);
    $("#Netto-Contribution").text( json[0]["order_overview"]["Netto Contribution"]);

    $("#Nedis-Margin").text( json[0]["order_details"]["Nedis Margin"]);
    $("#Std-Margin").text( json[0]["order_details"]["Std Margin"]);
    $("#Transport-Costs").text( json[0]["order_details"]["Transport Costs"]);

    $("#Order-Amount").text( json[0]["order_details"]["Order Amount"]);
    $("#Standard-Order-Amount").text( json[0]["order_details"]["Standard OrderAmount"]);
    $("#Total-Amount").text( json[0]["order_details"]["Total Amount"]);
  }
    
    //Start DataTable
  var initTable = function() {
		// begin first table


		var datatable = $('.m_datatable').mDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: 'assets/json/profit_margin/order_line.json',
				pageSize: 10,
			},

			// layout definition
			layout: {
				theme: 'default', // datatable theme
				class: '', // custom wrapper class
				scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
				footer: false // display/hide footer
			},

			// column sorting
			sortable: true,

			pagination: true,

			search: {
				input: $('#generalSearch')
            },
            // columns definition
			columns: [{
				field: "RecordID",
				title: "#",
				width: 50,
				sortable: false,
				selector: false,
				textAlign: 'center'
			}, {
				field: "OrderLineID",
				title: "Order Line ID"
            },
            {
                field:"StandardPrice",
                title:"Standard Price"
            },
            {
                field:"Price",
                title:"Price"
            },
            {
                field:"PriceDiff",
                title:"Difference"
            },
            {
                field:"Margin",
                title:"Margin"
            },
             {
				field: "ActMargin",
				title: "Actual Margin"
            },
            {
                field:"MarginDiff",
                title:"Difference"
            },
            /*{
				field: "ShipCountry",
				title: "Ship Country",
				template: function (row) {
					// callback function support for column rendering
					return row.ShipCountry + ' - ' + row.ShipCity;
				}
			},*/{
				field: "Status",
				title: "Status",
				// callback function support for column rendering
				template: function (row) {
					var status = {
						1: {'title': 'Pending', 'class': 'm-badge--brand'},
						2: {'title': 'On Hold', 'class': ' m-badge--info'},
						
					};
					return '<span class="m-badge ' + status[row.Status].class + ' m-badge--wide">' + status[row.Status].title + '</span>';
				}
            },{
				field: "Type",
				title: "Type",
				// callback function support for column rendering
				template: function (row) {
					var status = {
						1: {'title': 'Profitable', 'class': 'm-badge--brand'},
						2: {'title': 'Budget', 'class': ' m-badge--info'},
						
					};
					return '<span class="m-badge ' + status[row.Type].class + ' m-badge--wide">' + status[row.Type].title + '</span>';
				}
			},
            
            {
				field: "Actions",
				width: 110,
				title: "Actions",
				sortable: false,
				overflow: 'visible',
				template: function (row, index, datatable) {
					var dropup = (datatable.getPageSize() - index) <= 4 ? 'dropup' : '';
					return `
                    <a href="#" class="btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" aria-expanded="true">
                       <i class="la la-check"></i>
                     </a>
                     <span class="btn m-btn m-btn-light m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" aria-expanded="true">
                     <i class="la la-pause"></i>
                   </span>
                   
                 
                 <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">
                   <i class="la la-remove"></i>
                 </a>`;
                }
            }

            ]
        });
    
		var filter = function() {
			var val = $.fn.dataTable.util.escapeRegex($(this).val());
			table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
		};

		var asdasd = function(value, index) {
			var val = $.fn.dataTable.util.escapeRegex(value);
			table.column(index).search(val ? val : '', false, true);
		};

		$('#m_search').on('click', function(e) {
			e.preventDefault();
			var params = {};
			$('.m-input').each(function() {
				var i = $(this).data('col-index');
				if (params[i]) {
                    params[i] += '|' + $(this).val();
                    console.log(`if params[i] ${params[i]} i valye ${i}`);
				}
				else {
                    params[i] = $(this).val();
                    console.log(`else params[i] ${params[i]} i valye ${i}`);
				}
			});
			$.each(params, function(i, val) {
				// apply search params to datatable
				table.column(i).search(val ? val : '', false, false);
			});
			table.table().draw();
		});

		$('#m_reset').on('click', function(e) {
			e.preventDefault();
			$('.m-input').each(function() {
				$(this).val('');
				table.column($(this).data('col-index')).search('', false, false);
			});
			table.table().draw();
		});

		$('#m_datepicker').datepicker({
			todayHighlight: true,
			templates: {
				leftArrow: '<i class="la la-angle-left"></i>',
				rightArrow: '<i class="la la-angle-right"></i>',
            },
            
		});

    };
    
    //End DataTable  

    return {
        //main function to initiate the module
        init: function () {
            initTable();
            orderTotal();

            
            
        }
    };
}();

jQuery(document).ready(function() {
    PortletTools.init();
});