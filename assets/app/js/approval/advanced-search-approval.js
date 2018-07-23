var DatatablesSearchOptionsAdvancedSearch = function() {

	var approvalType;

	$.fn.dataTable.Api.register('column().title()', function() {
		return $(this.header()).text().trim();
	});

	var pageSetup = function(){
		//var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'json/approval/approval.json',
            'dataType': "json",
            'success': function (data) {
				renderPageTitle(data[0].PageTitle);
				renderBreadcrumbs(data[0].BreadCrums);
				renderTobTabs(data[0].TopTabs);
			}
			
        });
	}

	var renderPageTitle = function(title){
		$("#page-title").text(title);
	}
	var renderBreadcrumbs = function(data){
		
		$.each(data, function(key, value){
			$("#breadcrumb").append(`
			<li class="m-nav__item">
							<a href="${value.link}" class="m-nav__link">
								<span class="m-nav__link-text">${value.title}</span>
							</a>
						</li>`);

			if(value.saperator=="1"){
				$("#breadcrumb").append(` <li class="m-nav__separator">></li>`);
			}
						
			
		});
	}

	var renderTobTabs = function(data){
		$.each(data, function(key, value){

			$("#approval-top-tab").append(`
			<div class=" col  btn m-btn--custom m--padding-top-10 m--padding-bottom-10  
			m--margin-right-5 m--margin-top-5  m--padding-left-5 m--padding-right-5  m-btn--outline btn-outline-${value.color}" id=${value.id}>
			
			<div class="row">
				<div class="col  col-xl-8">
					<h6>
						<i class="${value.Icon}"></i> &nbsp; ${value.title}</h6>

				</div>
				<div class="col col-xl-4">
					<h6>${value.Count}</h6>
				</div>
			</div>
			<div class="row">
				<div class="col  col-xl-12">
					<span class="m-widget24__desc">${value.Details}</span>
				</div>
			</div>
			<!--end::Total Profit-->

		</div>
			`);

		});
	}
	

	var approvalDataTable = function() {
		// begin first table
		var table = $('#m_table_1').DataTable({
			responsive: true,
			//== Pagination settings
			dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			// read more: https://datatables.net/examples/basic_init/dom.html

			lengthMenu: [5, 10, 25, 50],

			pageLength: 10,



			language: {
				'lengthMenu': 'Display _MENU_',
			},

			ajax: {
				url: 'json/approval/approvals_list.json',
				type: 'POST',
				data: {
					// parameters for custom backend script demo
					columnsDef: [
						'RecordID', 'RequestDate', 'CustomerID', 'Customer', 'Approval',
						'TurnOver', 'Status', 'Actions'],
				},
			},

			columns: [
				{data: 'RecordID'},
				{data: 'RequestDate'},
				{data: 'CustomerID'},
				{data: 'Customer'},
				{data: 'Approval'},
				{data: 'TurnOver'},
				{data: 'Status'},
				{data: 'Actions'},
			],
			initComplete: function() {
				this.api().columns().every(function() {
					var column = this;

					switch (column.title()) {
						case 'Approval':
							 var approval = {
								1: {'title': 'Profit Margin', 'class': 'm-badge--brand'},
								2: {'title': 'Customer Credit', 'class': ' m-badge--metal'},
                                3: {'title': 'Customer Data', 'class': ' m-badge--primary'},
                                4: {'title': 'Discount', 'class': ' m-badge--primary'}
							};
							column.data().unique().sort().each(function(d, j) {
								$('.m-input[data-col-index="4"]').append('<option value="' + approval[d].title + '">' + approval[d].title + '</option>');
							});
							break;

						case 'Status':
							var status = {
								1: {'title': 'Pending', 'class': 'm-badge--brand'},
								2: {'title': 'On Hold', 'class': ' m-badge--metal'},
								3: {'title': 'Rejected', 'class': ' m-badge--primary'}
							};
							column.data().unique().sort().each(function(d, j) {
								$('.m-input[data-col-index="6"]').append('<option value="' + status[d].title + '">' + status[d].title + '</option>');
							});
							break;

						case 'TurnOver':
							var status = {
								1: {'title': 'Non Profitable', 'state': 'danger'},
								2: {'title': 'Budget', 'state': 'primary'},
								3: {'title': 'Profitable', 'state': 'accent'}
							};
							column.data().unique().sort().each(function(d, j) {
								$('.m-input[data-col-index="5"]').append('<option value="' + status[d].title  + '">' + status[d].title + '</option>');
							});
							break;							
					}
				});
			},

			columnDefs: [
				{
					targets: -1,
					title: 'Actions',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
						   <a href="#" class="btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" 
						   aria-expanded="true" title="Accept">
                              <i class="la la-check"></i>
                            </a>
							<span class="btn m-btn m-btn-light m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" aria-expanded="true"
							 title="Hold">
							<i class="la la-pause"></i>
						  </span>  
							<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
							title="Reject">
							<i class="la la-remove"></i>
							</a>`;
					},
				},
				{
					targets: 4,
					render: function(data, type, full, meta) {
						var status = {
                            1: {'title': 'Profit Margin', 'class': 'm-badge--brand','link':'#'},
                            2: {'title': 'Customer Credit', 'class': ' m-badge--metal','link':'#'},
                            3: {'title': 'Customer Data', 'class': ' m-badge--primary','link':'#'},
                            4: {'title': 'Discount', 'class': ' m-badge--success','link':'#'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						var approvalType = status[data].title;
						return '<span class="m--font-bold"> ' +status[data].title+ '</span>';
						
					},
				},
                {
					targets: 5,
					render: function(data, type, full, meta) {
						var status = {
                            1: {'title': 'Non Profitable', 'state': 'danger'},
                            2: {'title': 'Budget', 'state': 'primary'},
                            3: {'title': 'Profitable', 'state': 'accent'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						
						return '<span class="m-badge m-badge--' + status[data].state + ' m-badge--dot"></span>&nbsp;' +
							'<span class="m--font-bold">' + status[data].title + '</span>';
						
					},
				},
				{
					targets: 6,
					render: function(data, type, full, meta) {
						var status = {
							1: {'title': 'Pending', 'state': 'danger'},
							2: {'title': 'On Hold', 'state': 'primary'},
							3: {'title': 'Rejected', 'state': 'accent'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="m-badge m-badge--' + status[data].state + ' m-badge--wide">' + status[data].title + '</span>';
						
					},
                },
			],
		});

		

		var filter = function() {
			var val = $.fn.dataTable.util.escapeRegex($(this).val());
			table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
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


	};

	return {

		//main function to initiate the module
		init: function() {
			pageSetup();
			approvalDataTable();
		},

	};

}();

jQuery(document).ready(function() {
	DatatablesSearchOptionsAdvancedSearch.init();
});