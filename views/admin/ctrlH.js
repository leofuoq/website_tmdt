<div class="col-sm-12">
<div class="card">
<div class="card-header card-buttons">
<h4 class="card-title">Accounts</h4>
</div>
<div class="card-body">
<div class="table-responsive">
<table class="datatable table table-stripped">
<thead>
<tr>
<th>ID</th>
<th>Username</th>
<th>Email</th>
<th>Phone</th>
<th>Start date</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>
<tbody>
    <tr><%listAccount1.forEach(function(o) {%> 
        <td><%= o.id %></a></td>
        <td><%=o.username %> </td>
        <td><span><%=o.email %></span></td>
        <td><span><%=o.phonenumber %> </span></td>
        <td><span><%=o.Created %></span></td>
        <td><span><%=o.status %></span></td>
        <td class="d-flex align-items-center">
            <div class="dropdown dropdown-action">
            <a href="#" class=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
            <div class="dropdown-menu dropdown-menu-end">
            <ul>
            <li>
                <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#active_modal"><i class="far fa-edit me-2"></i>Active</a>
            </li>
            <li>
                <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#lock_modal"><i class="far fa-eye me-2"></i>Lock</a>
                </li>
            <li>
            <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete_modal"><i class="far fa-trash-alt me-2"></i>Delete</a>
            </li>

            </ul>
            </div>
            </div>
            </td>
            <td> 
                <div class="modal custom-modal fade" id="delete_modal" role="dialog">
                <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">
                <div class="modal-body">
                <div class="form-header">
                <h3>Delete Customer</h3>
                <p>Are you sure want to delete?</p>
                <input type="text" name="accid" value="<%=o.id%>" style="display:none"><br>
                <input type="text" name="sttid" value="3" style="display:none"><br>

                </div>
                <div class="modal-btn delete-action">
                <div class="row">
                <div class="col-6">
                <button type="reset" data-bs-dismiss="modal" class="w-100 btn btn-primary paid-continue-btn">Delete</button>
                </div>
                <div class="col-6">
                <button type="submit" data-bs-dismiss="modal" class="w-100 btn btn-primary paid-cancel-btn">Cancel</button>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            
                <div class="modal custom-modal fade" id="active_modal" role="dialog">
                    <div class="modal-dialog modal-dialog-centered modal-md">
                    <div class="modal-content">
                    <div class="modal-body">
                    <div class="form-header">
                    <h3>Active Customer</h3>
                    <p>Are you sure want to active?</p>
                    <input type="text" name="accid" value="<%=o.id%>" style="display:none"><br>
                    <input type="text" name="sttid" value="1" style="display:none"><br>
                    </div>
                    <div class="modal-btn delete-action">
                    <div class="row">
                    <div class="col-6">
                    <button type="reset" data-bs-dismiss="modal" class="w-100 btn btn-primary paid-continue-btn">Active</button>
                    </div>
                    <div class="col-6">
                    <button type="submit" data-bs-dismiss="modal" class="w-100 btn btn-primary paid-cancel-btn">Cancel</button>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>

                      <div class="modal custom-modal fade" id="lock_modal" role="dialog">
                        <div class="modal-dialog modal-dialog-centered modal-md">
                        <div class="modal-content">
                        <div class="modal-body">
                         <form action ='/editAccStatus' method = 'POST'>
                        <div class="form-header">
                        <h3>Lock Customer</h3>
                        <p>Are you sure want to lock?</p>
                        <input type="text" name="accid" value="<%=o.id%>" style="display:none"><br>
                        <input type="text" name="status" value="2" style="display:none"><br>
                        </div>
                        <div class="modal-btn delete-action">
                        <div class="row">
                        <div class="col-6">
                        <button type="submit" data-bs-dismiss="modal" class="w-100 btn btn-primary paid-continue-btn">Lock</button>
                        </div>
                        <div class="col-6">
                        <button type="submit" data-bs-dismiss="modal" class="w-100 btn btn-primary paid-cancel-btn">Cancel</button>
                        </div>
                        </div>
                        </div>
                        </form>
                        </div>
                        </div>
                        </div>
                        </div>
            </td>
        </tr><% }); %>  
        
        
</tbody>
</table>
</div>
</div>
</div>
</div>





<td><div class="modal custom-modal fade" id="lock_modal" role="dialog">
                    <div class="modal-dialog modal-dialog-centered modal-md">
                    <div class="modal-content">
                    <div class="modal-body">
                     <form action ='/editAccStatus' method = 'POST'>
                    <div class="form-header">
                    <h3>Lock Customer</h3>
                    <p>Are you sure want to lock?</p>
                    <input type="text" name="accid" value="<%=o.id%>" style="display:none"><br>
                    <input type="text" name="status" value="2" style="display:none"><br>
                    </div>
                    <div class="modal-btn delete-action">
                    <div class="row">
                    <div class="col-6">
                    <button type="submit" data-bs-dismiss="modal" class="w-100 btn btn-primary paid-continue-btn">Lock</button>
                    </div>
                    <div class="col-6">
                    <button type="submit" data-bs-dismiss="modal" class="w-100 btn btn-primary paid-cancel-btn">Cancel</button>
                    </div>
                    </div>
                    </div>
                    </form>
                    </div>
                    </div>
                    </div>
                    </div>
                </td>   
 <td><div class="modal custom-modal fade" id="delete_modal" role="dialog">
                    <div class="modal-dialog modal-dialog-centered modal-md">
                    <div class="modal-content">
                    <div class="modal-body">
                     <form action ='/editAccStatus' method = 'POST'>
                    <div class="form-header">
                    <h3>Lock Customer</h3>
                    <p>Are you sure want to delete?</p>
                    <input type="text" name="accid" value="<%=o.id%>" style="display:none"><br>
                    <input type="text" name="status" value="3" style="display:none"><br>
                    </div>
                    <div class="modal-btn delete-action">
                    <div class="row">
                    <div class="col-6">
                    <button type="submit" data-bs-dismiss="modal" class="w-100 btn btn-primary paid-continue-btn">Delete</button>
                    </div>
                    <div class="col-6">
                    <button type="submit" data-bs-dismiss="modal" class="w-100 btn btn-primary paid-cancel-btn">Cancel</button>
                    </div>
                    </div>
                    </div>
                    </form>
                    </div>
                    </div>
                    </div>
                    </div></td>

                    <td><div class="modal custom-modal fade" id="active_modal" role="dialog">
                        <div class="modal-dialog modal-dialog-centered modal-md">
                        <div class="modal-content">
                        <div class="modal-body">
                         <form action ='/editAccStatus' method = 'POST'>
                        <div class="form-header">
                        <h3>Lock Customer</h3>
                        <p>Are you sure want to active?</p>
                        <input type="text" name="accid" value="<%=o.id%>" style="display:none"><br>
                        <input type="text" name="status" value="1" style="display:none"><br>
                        </div>
                        <div class="modal-btn delete-action">
                        <div class="row">
                        <div class="col-6">
                        <button type="submit" data-bs-dismiss="modal" class="w-100 btn btn-primary paid-continue-btn">Active</button>
                        </div>
                        <div class="col-6">
                        <button type="submit" data-bs-dismiss="modal" class="w-100 btn btn-primary paid-cancel-btn">Cancel</button>
                        </div>
                        </div>
                        </div>
                        </form>
                        </div>
                        </div>
                        </div>
                        </div></td>