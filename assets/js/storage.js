$(document).ready(function()
{		


 	
 	//load new task screen 
 	$(document).on('click', '.BTN_Add_New', function(event) 
 	{
 		//Get data from template
 		var GetTemplateData = $('.Template_New_Task').html();

 		$('.Screen_Data').html(GetTemplateData);
 		$('.Screen_Data').find('.btn_Task').html('Save').addClass('BTN_Save_New_Task')
 		$('.Screen_Data').show();
 	});


 	//new task screen add button action
 	$('.Screen_Data').on('click', '.BTN_Save_New_Task', function(event) 
 	{	 
 		//To clear all old alerts
		bs.ClearError();

 		//Get values
 		var TaskName = $('.Screen_Data').find('.TaskName');
		var TaskDate = $('.Screen_Data').find('.TaskDate');
 		var TaskDesc = $('.Screen_Data').find('.TaskDesc');

 		if(frm.IsEmpty(TaskName.val() ))
		{
			//Show alert
			bs.ShowError ("Please enter Task Name",TaskName)
		}
		else if(frm.IsEmpty(TaskDate.val()))
		{
			//Show alert
			bs.ShowError ("Please enter Task Completion Date",TaskDate)
		}
		else if(frm.IsEmpty(TaskDesc.val()))
		{
			//Show alert
			bs.ShowError ("Please enter Task description",TaskDesc)
		}
		else
		{			 
			var AddTask = 
			{ 
				'rec_id':js.MD5(),
				'TaskName' : TaskName.val(), 
				'TaskDate' : TaskDate.val(), 
				'TaskDesc' : TaskDesc.val(), 
			};

			//ls.AddArr(LocalstorageName,AddTask);
			tblTasks.push(AddTask);
			
			var d = bs.AlertMsg("Successfully add your new task", "success");
			$('.Screen_Data').html(d);

			//Show All tasks
			 
			$(".BTN_View").click();
		}
				
 
 	});
 	//--->Add - End



 	//--->View - Start
	$(document).on('click', '.BTN_View', function(event) 
 	{
 		//Get data  
 		var AllTasks = tblTasks;
 		 

 		if(js.Size(AllTasks) < 1 || js.Size(AllTasks)==0)
 		{ 
 			var d = bs.AlertMsg("Oppps...Looks like there are no tasks. <br><br> You should add a task first", "warning");
			$('.Screen_Data').html(d).show();
 			return false;
 		}

 		//console.table(AllTasks);

 		var strTableData = '';
 		strTableData +='<table class="table table-hover">';
 		strTableData += '<thead>';
 		//strTableData += '<tr>';
 		strTableData += '<th>Line Num</th>';
 		strTableData += '<th>Task Name</th>';
 		strTableData += '<th>Task Date</th>';
 		strTableData += '<th>Task Desc</th>';
 		strTableData += '<th>Options</th>';
 		//strTableData += '</tr>'; 		
 		strTableData += '</thead>';


 		strTableData += '<tbody>'
 		for (var i = 0; i < AllTasks.length; i++) 
 		{
 			var val = AllTasks[i]; 			 
 			
 			var line_num = i+ 1;
 			
			strTableData += '<tr>';
		 	strTableData += '<td>'+line_num +'</td>';
			strTableData += '<td>'+val.TaskName+'</td>';
			strTableData += '<td>'+moment(val.TaskDate).format('M-D-Y')+'</td>';
			strTableData += '<td>'+val.TaskDesc+'<td>'; 

			//Edit/Delete Options
			var Edit = '<a href="#" class="BTN_Edit_Entry" rec_id="'+  val.rec_id +'" TaskDate="'+  val.TaskDate +'" >Edit</a> / ';
			var Delete = '<a href="#" class="BTN_Delete_Entry" rec_id="'+  val.rec_id +'"  TaskDate="'+  val.TaskDate +'"  task_name="'+val.TaskName+'">Delete</a>';

			strTableData += '<td>'+Edit+Delete+'<td>'; 
			strTableData += '</tr>'; 
 			 
 		};
 		strTableData += '<tbody>'
 		strTableData += '</table>';

 		$('.Screen_Data').html(strTableData).show();

 	});
	//--->View - End


	//--->Edit - Start	
	$(document).on('click', '.BTN_Edit_Entry', function(event) 
 	{
 		var rec_id  = $(this).attr('rec_id');
 		var TaskDate = $(this).attr('TaskDate');

 		//Get data from template
 		var GetTemplateData = $('.Template_New_Task').html();

 		$('.Screen_Data').html(GetTemplateData);
 		$('.Screen_Data').find('.btn_Task').html('Update').addClass('BTN_Update_Task');
 		$('.Screen_Data').find('.btn_Task').attr('rec_id', rec_id);

		//map and grep
		var data = $.map( tblTasks, function( val, i) 
		{		
			if(val.rec_id == rec_id)
			{ 
				return val;
			}
		});
	 


 		var TaskName = $('.Screen_Data').find('.TaskName').val(data[0].TaskName);
		var TaskDate = $('.Screen_Data').find('.TaskDate').val(data[0].TaskDate);
 		var TaskDesc = $('.Screen_Data').find('.TaskDesc').val(data[0].TaskDesc);
 
 		$('.Screen_Data').show();
 	});

 	//Update task
	$('.Screen_Data').on('click', '.BTN_Update_Task', function(event) 
 	{	 
 		//To clear all old alerts
		bs.ClearError();

 		//Get values
 		var TaskName = $('.Screen_Data').find('.TaskName');
		var TaskDate = $('.Screen_Data').find('.TaskDate');
 		var TaskDesc = $('.Screen_Data').find('.TaskDesc');

 		if(frm.IsEmpty(TaskName.val() ))
		{
			//Show alert
			bs.ShowError ("Please enter Task Name",TaskName)
		}
		else if(frm.IsEmpty(TaskDate.val()))
		{
			//Show alert
			bs.ShowError ("Please enter Task Completion Date",TaskDate)
		}
		else if(frm.IsEmpty(TaskDesc.val()))
		{
			//Show alert
			bs.ShowError ("Please enter Task description",TaskDesc)
		}
		else
		{		
			var rec_id  = $(this).attr('rec_id');

			//Update value
			
			var data = $.map( tblTasks, function( val, i) 
			{		
				if(val.rec_id == rec_id)
				{ 
					val.TaskName = TaskName.val();
					val.TaskDate = TaskDate.val();
					val.TaskDesc = TaskDesc.val();												
				}
			});

			var d = bs.AlertMsg("Successfully update your task", "success");
			$('.Screen_Data').html(d);

			//Show All tasks			 
			$(".BTN_View").click();
		}
 	});
	//--->Edit - End

	//--->Delete - Start
	$(document).on('click', '.BTN_Delete_Entry', function(event) 
 	{
 		var rec_id  = $(this).attr('rec_id');
 		var task_name = $(this).attr('task_name');

 		var ObjArrOptions = 
		{
		  text: "Are you sure you want to delete Task Name (<b>"+task_name+"<b>) ?",
		  title: "Confirmation required",
		  confirm: function(button) 
		  {				

			//delete only one element from array
			var newarr = $.map( tblTasks, function( val, i) 
			{		
				if(val.rec_id !== rec_id)
				{ 					 
					return val;
				}
			});

			//update array elements
			tblTasks =  newarr;
		


			//Show All tasks			 
			$(".BTN_View").click();

		  },
		  cancel: function(button) 
		  {
		    // nothing to do
		  },
		  confirmButton: "Yes I am",
		  cancelButton: "No",                       
		  confirmButtonClass: "btn-danger",    //Bootstrap button class
		  cancelButtonClass: "btn-default",    //Bootstrap button class
		  dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
		}

		//Call is like this
		bs.confirm(ObjArrOptions);

 	});
	
	$(document).on('click', '.BTN_Delete_All', function(event)  	
 	{
 		var AllTasks = _.sortBy(tblTasks, ['TaskDate']);
 		
 		if(js.Size(AllTasks) < 1 || js.Size(AllTasks)==0)
 		{ 
 			var d = bs.AlertMsg("Oppps...Looks like there are no tasks. <br><br> You should add a task first", "warning");
			$('.Screen_Data').html(d).show();
 			return false;
 		}


 		var ObjArrOptions = 
		{
		  text: "Are you sure you want to delete All Tasks ?",
		  title: "Confirmation required",
		  confirm: function(button) 
		  {
			//delete all data from array
			tblTasks = [];
			//Show All tasks			 
			$(".BTN_View").click();

		  },
		  cancel: function(button) 
		  {
		    // nothing to do
		  },
		  confirmButton: "Yes I am",
		  cancelButton: "No",                       
		  confirmButtonClass: "btn-danger",    //Bootstrap button class
		  cancelButtonClass: "btn-default",    //Bootstrap button class
		  dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
		}

		//Call is like this
		bs.confirm(ObjArrOptions);
 		
 	});
	//--->Delete - End

	//Show tasks on page load
	if(js.Size(tblTasks) >0 )
	{ 
		$(".BTN_View").click(); 	
	}
});