// Import module kết nối cơ sở dữ liệu và đối tượng Cart
const pool = require('../config/database')



const insertAcc = async (name,email,password,phone,isSell,isAdmin,accStatus) => {

    try {
        // Thực hiện truy vấn SQL để chèn tài khoản mới vào cơ sở dữ liệu
        await pool.query(
            `insert into account(username, email, password, phonenumber,issell, isadmin, accstatus)
                values($1,$2,$3,$4,$5,$6,$7)`,[name,email,password,phone,isSell,isAdmin,accStatus])
    } catch (error) {
        console.error('Error inserting account:', error);
        throw error; // Ném ra lỗi để xử lý ở nơi gọi hàm
    }
};

   
const checkAccountExist = async (email) => {
    try {
        // Thực hiện truy vấn SQL để kiểm tra sự tồn tại của tài khoản
        const checkResult = await pool.query('SELECT password FROM account WHERE email = $1', [email]);

        // Kiểm tra số lượng bản ghi trả về từ truy vấn
        if (checkResult.rowCount > 0) {
            // Nếu có tài khoản tồn tại, tạo một đối tượng Account từ dữ liệu và trả về nó
            const acc = checkResult.rows
            const id = checkResult.rows[0]
            console.log(id)
            return acc;
        } else {
            // Nếu không tìm thấy tài khoản, trả về null
            return null;
        }
    } catch (error) {
        console.error('Error checking account existence:', error);
        throw error; // Ném ra lỗi để xử lý ở nơi gọi hàm
    }
};const getAccount = async (email) => {
  try {
      // Thực hiện truy vấn SQL để kiểm tra sự tồn tại của tài khoản
      const checkResult = await pool.query('SELECT * FROM account WHERE email = $1', [email]);

      // Kiểm tra số lượng bản ghi trả về từ truy vấn
      if (checkResult.rowCount > 0) {
          // Nếu có tài khoản tồn tại, tạo một đối tượng Account từ dữ liệu và trả về nó
          const acc = checkResult.rows
          return acc;
      } else {
          // Nếu không tìm thấy tài khoản, trả về null
          return null;
      }
  } catch (error) {
      console.error('Error checking account existence:', error);
      throw error; // Ném ra lỗi để xử lý ở nơi gọi hàm
  }
};
const getAllProduct = async () => {
    try {
      const result = await pool.query('SELECT * FROM product');
      return result.rows;
    } catch (error) {
      console.error('Error retrieving products by category:', error);
      throw error; // Ném ra lỗi để xử lý ở nơi gọi hàm
    }
  };
  
const getProductByCate = async (cateid) => {
    try {
      const result = await pool.query('SELECT * FROM product WHERE cateid = $1', [cateid]);
      return result.rows;
    } catch (error) {
      console.error('Error retrieving products by category:', error);
      throw error; // Ném ra lỗi để xử lý ở nơi gọi hàm
    }
  };
  
  const hotdeals = async () => {
    try {
      const result = await pool.query('SELECT * FROM product WHERE id in(10,170, 250)');
      return result.rows;
    } catch (error) {
      console.error('Error retrieving products by category:', error);
      throw error; // Ném ra lỗi để xử lý ở nơi gọi hàm
    }
  };

  const category10 = async () => {
    const result = await pool.query("SELECT * FROM category where id in (1,2,3,4,5,9,20) ");
    return result.rows;
  };
  const supplier = async () => {
    const result = await pool.query("SELECT * FROM supplier");
    return result.rows;
  };
  const getCateName = async (cateid) => {
    const result = await pool.query(`select * from category where id = $1`,[cateid])
    return result.rows
  }
  const category = async () => {
    const result = await pool.query("SELECT * FROM category");
    return result.rows;
  };

// Định nghĩa hàm checkCartExist trong DAO
const checkCartExist = async (accountId, productId) => {
    try {
        // Truy vấn SQL để kiểm tra sự tồn tại của giỏ hàng
        const result = await pool.query('SELECT * FROM cart WHERE accountId = $1 AND productId = $2', [accountId, productId]);
        // Kiểm tra kết quả trả về từ truy vấn
        if (result.rows.length > 0) {
            // Nếu có giỏ hàng tồn tại, trả về đối tượng giỏ hàng
            const cartData = result.rows[0];
            return cartData
        } else {
            // Nếu không tìm thấy giỏ hàng, trả về null
            return null;
        }
    } catch (error) {
        console.error('Error checking cart existence:', error);
        throw error; // Ném ra lỗi để xử lý ở nơi gọi hàm
    }
};

const insertCart = async (accountId, productId,amount) => {
    try {
        // Thực hiện truy vấn SQL để chèn tài khoản mới vào cơ sở dữ liệu
        await pool.query(
            `insert into cart(accountId, productId,amount)
                values($1,$2,$3)`,[accountId, productId,amount])
    } catch (error) {
        console.error('Error inserting account:', error);
        throw error; // Ném ra lỗi để xử lý ở nơi gọi hàm
    }
};

const getCart = async (accid) => {
    try {
      const result = await pool.query(`With A AS (select a.id as cart_id, a.accountid, a.productid, a.amount,b. name, b. price, b.image, b.cost 
        From cart as a Join product as b
        ON a.productid = b.id
        WHERE a.accountid = $1),
        B as (Select  accountid, productid, sum(amount) as quantity,price, name,image, sum(amount) * price as total_price,
			  sum(amount) * cost as total_cost 
        From A
        Group by accountid, productid, price,cost, name, image)
        select accountid, productid, quantity, price, name, image, total_price,total_cost as totalcost, (select sum(total_price) as subtotal from B)
        from B`, [accid]);
      return result.rows;
    } catch (error) {
      console.error('Error retrieving products by category:', error);
      throw error; // Ném ra lỗi để xử lý ở nơi gọi hàm
    }
  };
  const editAmountCart = async( accountId, productId, newamount) => {
    try {
      await pool.query(
        `update cart set amount =$3  where productid =$2  and accountid = $1`,[accountId , productId, newamount])
    } catch (error) {
      console.error('Error retrieving products by category:', error);
      throw error;
    }
    };
    const deleteCart = async(accountId, productId) => {
      try {
        await pool.query(
          `delete from cart where productid =$2  and accountid = $1`,[accountId , productId])
      } catch (error) {
        console.error('Error retrieving products by category:', error);
        throw error;
      }
      };
      const deleteAllCart = async(accid) => {
        try {
          await pool.query(
            `delete from cart where accountid = $1`,[accid])
        } catch (error) {
          console.error('Error retrieving products by category:', error);
          throw error;
        }
        };

  const insertOrder = async(accountid, productid, quantity,status,grandtotal,totalcost) =>{
  try {
    await pool.query(
      `insert into orders(accountid, productid, quantity, status,grandtotal,cost)
          values($1,$2,$3,$4,$5,$6)`,[accountid, productid, quantity,status,grandtotal,totalcost])
  } catch (error) {
    console.error('Error retrieving products by category:', error);
    throw error;
  }
  }
  const getOrderByAccid = async(accid) =>{
    try{
      const result = await pool.query(`select a.id as orderid, a.accountid, a.productid,b.name as productname, a.quantity, b.price,a.grandtotal,
      date(a.orderdate) as orderdate,
      c.sttname as status 
      from orders as a
      join product as b on a.productid = b.id 
      join status as c on a.status = c.id
      where a.accountid = $1
      order by orderdate desc`, [accid]);
      return result.rows;
    } catch (error) {

    }
  }
  const getDetail = async(productid) =>{
    try{
      const result = await pool.query(`select * from product where id =$1 `, [productid]);
      return result.rows;
    } catch (error) {
    }
  }

  const searchByName = async(searchName) =>{
    try{
      const result = await pool.query(`SELECT * FROM product WHERE LOWER(name) LIKE '%' || $1 || '%' `, [searchName]);
      return result.rows;
    } catch (error) {
    }
  }

  const insertFeedback = async(accountid, productid, name, content, quality, price, value,summary) =>{
    try {
      await pool.query(
        `insert into feedback(accountid, productid, name, content, quality, price, value,summary)
            values($1,$2,$3,$4,$5,$6,$7,$8)`,[accountid, productid, name, content, quality, price, value,summary])
    } catch (error) {
      console.error('Error retrieving products by category:', error);
      throw error;
    }
    }
  const getFeedbackByProductid = async(productid) =>{
    try{
      const result = await pool.query(`select id, accountid, name, content,summary, round((quality + price + value)/ 3) AS average 
      from feedback where productid =$1 `, [productid]);
      return result.rows;
    } catch (error) {
    }
  }
  const getCateOnDetail = async(productid) =>{
    try{
      const result = await pool.query(`select c.id as cid, c.cname as cname from category as c
      join product as p
      on c.id = p.cateid
      where p.id =$1 `, [productid]);
      return result.rows;
    } catch (error) {
    }
  }
///setting home
  const getTagAll = async() =>{
    try{
      const result = await pool.query(`select * from product where id in(15,220,200,101,230,40) `);
      return result.rows;
    } catch (error) {
    }
  }
  const getTagTelevison = async() =>{
    try{
      const result = await pool.query(`select * from product where cateid = 1 limit 6 `);
      return result.rows;
    } catch (error) {
    }
  }

  const getTagEC= async() =>{
    try{
      const result = await pool.query(`select * from product where cateid = 4 limit 6 `);
      return result.rows;
    } catch (error) {
    }
  }
  const getTagCooker= async() =>{
    try{
      const result = await pool.query(`select * from product where cateid = 20 limit 6 `);
      return result.rows;
    } catch (error) {
    }
  }
    const getSpecialOffer= async() =>{
    try{
      const result = await pool.query(`select * from product where id in(20,21,22,180,200,201,208,209,230,25,26,27,182,204,206,207,213,231 )`);
      return result.rows;
    } catch (error) {
    }
  }

  //dashboard 
  const getAllAccount= async() =>{
    try{
      const result = await pool.query(`select a.id, a.username, a.email, a.phonenumber, date(a.created_at), b.sttname as status
      from account as a
      join status as b
      on a.accstatus = b.id
      order by a.id limit 100
       `);
      return result.rows;
    } catch (error) {
    }
  }
  const getAccStatus= async() =>{
    try{
      const result = await pool.query(`select * from status where id in(1,2,3) `);
      return result.rows;
    } catch (error) {
    }
  }

  const getProducts= async() =>{
    try{
      const result = await pool.query(`select p.id, p.name, p.image, p.price, p.cost, p.description,
      c.cname as category, s.sttname as status, lower(sl.sname) as supplier
      from product as p
      join status as s
      on p.status = s.id
      join supplier as sl
      on p.supplierid = sl.id
      join category as c
      on p.cateid = c.id
       `);
      return result.rows;
    } catch (error) {
    }
  }
  
  const getAllOrders= async() =>{
    try{
      const result = await pool.query(`select a.id as orderid, a.accountid, a.productid,b.name as productname, a.quantity, b.price,a.grandtotal,
      date(a.orderdate) as orderdate,
      c.sttname as status,
	  acc.username as username
      from orders as a
      join product as b on a.productid = b.id 
      join status as c on a.status = c.id
	  join account as acc on a.accountid=acc.id
      order by orderdate desc 
      limit 100
       `);
      return result.rows;
    } catch (error) {
    }
  }
  const getOrderStatus= async() =>{
    try{
      const result = await pool.query(`select * from status where id in(4,5,6,7,8) `);
      return result.rows;
    } catch (error) {
    }
  }

  const getMonthly= async(month,year) =>{
    try{
      const result = await pool.query(`select * from CEOdashboard_monthly where month = $1 and year = $2`,[month,year]);
      return result.rows;
    } catch (error) {
    }
  }
  const SalesAnalytics= async(year) =>{
    try{
      const result = await pool.query(`select revenue, net_profit from CEOdashboard_monthly where year = $1`,[year]);
      return result.rows;
    } catch (error) {
    }
  }
  const SalesAnalytics_yearly= async() =>{
    try{
      const result = await pool.query(`select revenue, net_profit from CEOdashboard_yearly`);
      return result.rows;
    } catch (error) {
    }
  }
  const SalesAnalytics_daily= async(month,year) =>{
    try{
      const result = await pool.query(`select extract(day from date) as day, revenue, net_profit from CEOdashboard_daily where 
      extract(month from date) = $1 and extract(year from date) =$2`,[month, year]);
      return result.rows;
    } catch (error) {
    }
  }
  const OrdersAnalytics= async() =>{
    try{
      const result = await pool.query(` 
      SELECT status, COUNT(*) AS count
      FROM orders
      WHERE DATE_TRUNC('month', orderdate) = DATE_TRUNC('month', CURRENT_DATE)
      GROUP BY status
      ORDER BY status`);
      return result.rows;
    } catch (error) {
    }
  }
  const topCusByQuantity= async(month,year) =>{
    try{
      const result = await pool.query(` 
      select a.accountid, b.username, sum(a.total_quantity) as total_quantity
      from customers_tracking a 
      join account b
      on a.accountid = b.id
      where month=$1 and year=$2
      group by accountid,b.username
      order by total_quantity DESC limit 10`,[month,year]);
      return result.rows;
    } catch (error) {
    }
  }
  const topCusByAmount= async(month,year) =>{
    try{
      const result = await pool.query(` 
      select a.accountid, b.username, sum(a.total_amount) as total_amount
      from customers_tracking a 
      join account b
      on a.accountid = b.id
      where month=$1 and year=$2
      group by accountid,b.username
      order by total_amount DESC limit 10`,[month,year]);
      return result.rows;
    } catch (error) {
    }
  }

  const topProByAmount= async(month,year) =>{
    try{
      const result = await pool.query(` 
      select a.productid, b.name, sum(a.total_amount) as total_amount
      from product_tracking a 
      join product b
      on a.productid = b.id
      where month=$1 and year=$2
      group by productid, b.name
      order by total_amount DESC limit 10`,[month,year]);
      return result.rows;
    } catch (error) {
    }
  }
  const topProByQuantity= async(month,year) =>{
    try{
      const result = await pool.query(` 
      select a.productid, b.name, sum(a.total_quantity) as total_quantity
      from product_tracking a 
      join product b
      on a.productid = b.id
      where month=$1 and year=$2
      group by productid, b.name
      order by total_quantity DESC limit 10`,[month,year]);
      return result.rows;
    } catch (error) {
    }
  }

  const topSupByQuantity= async(month,year) =>{
    try{
      const result = await pool.query(` 
      select c.sname, sum(a.total_quantity) as total_quantity
      from product_tracking a 
      join product b
      on a.productid = b.id
      join supplier c
      on c.id = b.supplierid
      where month=$1 and year=$2
      group by c.sname
      order by total_quantity DESC limit 10`,[month,year]);
      return result.rows;
    } catch (error) {
    }
  }
  const topSupByAmount= async(month,year) =>{
    try{
      const result = await pool.query(` 
      select c.sname, sum(a.total_amount) as total_amount
      from product_tracking a 
      join product b
      on a.productid = b.id
      join supplier c
      on c.id = b.supplierid
      where month=$1 and year=$2
      group by c.sname
      order by total_amount DESC limit 10`,[month,year]);
      return result.rows;
    } catch (error) {
    }
  }

  const topCateByQuantity= async(month,year) =>{
    try{
      const result = await pool.query(` 
      select b.cname, sum(a.total_quantity) as total_quantity
      from category_tracking a 
      join category b
      on a.cateid = b.id
      where month=$1 and year=$2
      group by b.cname
      order by total_quantity DESC `,[month,year]);
      return result.rows;
    } catch (error) {
    }
  }
  const topCateByAmount= async(month,year) =>{
    try{
      const result = await pool.query(` 
      select b.cname, sum(a.total_amount) as total_amount
      from category_tracking a 
      join category b
      on a.cateid = b.id
      where month=$1 and year=$2
      group by b.cname
      order by total_amount DESC`,[month,year]);
      return result.rows;
    } catch (error) {
    }
  }

  const ordersThisMonth= async(month,year) =>{
    try{
      const result = await pool.query(` 
      select count(id) from orders
      where extract(month from orderdate) = $1 and extract(year from orderdate) =$2`,[month,year]);
      return result.rows;
    } catch (error) {
    }
  }

  const customersThisMonth= async(month,year) =>{
    try{
      const result = await pool.query(` 
      select count(distinct accountid) from orders
      where extract(month from orderdate) = $1 and extract(year from orderdate) =$2`,[month,year]);
      return result.rows;
    } catch (error) {
    }
  }

  
  const productsThismonth= async(month,year) =>{
    try{
      const result = await pool.query(` 
      select count(distinct productid) from orders
      where extract(month from orderdate) = $1 and extract(year from orderdate) =$2`,[month,year]);
      return result.rows;
    } catch (error) {
    }
  }
  const OrdersAnalytics_year= async() =>{
    try{
      const result = await pool.query(` 
      SELECT status, COUNT(*) AS count
      FROM orders
      WHERE DATE_TRUNC('year', orderdate) = DATE_TRUNC('year', CURRENT_DATE)
      GROUP BY status
      ORDER BY status`);
      return result.rows;
    } catch (error) {
    }
  }

  const linecoldata= async(month, year) =>{
    try{
      const result = await pool.query(` 
      SELECT extract(Day from date) AS day, SUM(net_revenue) AS net_revenue, 
sum(gross_profit) as gross_profit, gross_profit_margin
FROM CEOdashboard_daily
WHERE extract(month from date) = $1
and extract(year from date) =  $2
GROUP BY DATE(date),gross_profit_margin`,[month, year]);
      return result.rows;
    } catch (error) {
    }
  }
  const linecoldata_monthly= async( year) =>{
    try{
      const result = await pool.query(` 
      select net_revenue,gross_profit from CEOdashboard_monthly
    WHERE year =$1`,[year]);
      return result.rows;
    } catch (error) {
    }
  } 
 

  const linecoldata_yearly= async() =>{
    try{
      const result = await pool.query(` SELECT year, net_revenue,gross_profit
      FROM CEOdashboard_yearly`);
      return result.rows;
    } catch (error) {
    }
  }
  const line = async(month, year) =>{
    try{
      const result = await pool.query(` 
      select revenue_growth_rate from CEOdashboard_yearly`);
      return result.rows;
    } catch (error) {
    }
  }
  const line_monthly= async( year) =>{
    try{
      const result = await pool.query(` 
      select revenue_growth_rate from CEOdashboard_monthly where year=$1`,[year]);
      return result.rows;
    } catch (error) {
    }
  }
  const donutData_RBC= async(month, year) =>{
    try{
      const result = await pool.query(` 
      SELECT
     c.cname,
    SUM(o.total_amount) AS revenue
FROM
    category_tracking o
JOIN category c on o.cateid = c.id 
WHERE
    o.month = $1 and o.year=$2
GROUP BY
    o.cateid,c.cname`,[month, year]);
      return result.rows;
    } catch (error) {
    }
  }
  const donutData_RBC_year= async( year) =>{
    try{
      const result = await pool.query(` 
      
SELECT c.cname, SUM(o.total_amount) AS revenue
FROM category_tracking o
JOIN category c on o.cateid = c.id 
WHERE o.year= $1
GROUP BY o.cateid,c.cname`,[year]);
      return result.rows;
    } catch (error) {
    }
  }
  const donutData_QBC= async(month, year) =>{
    try{
      const result = await pool.query(` 
      SELECT
     c.cname,
    SUM(o.total_quantity) AS quantity
FROM
    category_tracking o
JOIN category c on o.cateid = c.id 
WHERE
    o.month = $1 and o.year=$2
GROUP BY
    o.cateid,c.cname`,[month, year]);
      return result.rows;
    } catch (error) {
    }
  }

  const donutData_QBC_year = async(year) =>{
  try{
    const result = await pool.query(` 
    SELECT c.cname, SUM(o.total_quantity) AS quantity
    FROM category_tracking o
    JOIN category c on o.cateid = c.id 
    WHERE o.year= $1
    GROUP BY o.cateid,c.cname`,[ year]);
    return result.rows;
 }catch(error){}
  }
  const donutData_QBS= async(month, year) =>{
    try{
      const result = await pool.query(` 
      SELECT s.sname, SUM(o.quantity) AS quantity
      FROM quantitysold o
      JOIN product p on o.cateid = p.cateid
      JOIN supplier s on p.supplierid = s.id
      WHERE
          o.month = $1 and o.year=$2
      GROUP BY
          o.cateid,s.sname`,[month, year]);
      return result.rows;
    } catch (error) {
    }
  }
  const retention= async(year) =>{
    try{
      const result = await pool.query(` 
      WITH new_customers AS (
        SELECT
            EXTRACT(MONTH FROM orderdate) AS month,
            COUNT(DISTINCT accountid) AS num_new_customers
        FROM
            orders
        WHERE
            EXTRACT(YEAR FROM orderdate) = $1
        GROUP BY
            EXTRACT(MONTH FROM orderdate)
    ),
        returning_customers AS (
        SELECT
            EXTRACT(MONTH FROM orderdate) AS month,
            COUNT(DISTINCT accountid) AS num_returning_customers
        FROM
            orders o
        WHERE
            EXTRACT(YEAR FROM orderdate) = $1
            AND EXISTS (
                SELECT 1
                FROM orders o2
                WHERE 
                    EXTRACT(MONTH FROM o2.orderdate) = EXTRACT(MONTH FROM o.orderdate) - 1
                    AND EXTRACT(YEAR FROM o2.orderdate) = EXTRACT(YEAR FROM o.orderdate)
                    AND o2.accountid = o.accountid
            )
        GROUP BY
            EXTRACT(MONTH FROM orderdate)
    )
    SELECT
        nc.month,
        nc.num_new_customers,
        COALESCE(rc.num_returning_customers, 0) AS num_returning_customers,
        ROUND(COALESCE(rc.num_returning_customers, 0) * 100.0 / nc.num_new_customers, 2) AS retention_rate
    FROM
        new_customers nc
    LEFT JOIN
        returning_customers rc ON nc.month = rc.month
    ORDER BY
        nc.month;`,[year]);
      return result.rows;
    } catch (error) {
    }
  }


  //edit
  const editAccStatus = async (accid, status) => {
    try {
        await pool.query( `update account set accstatus = $2 where id =$1`,[accid, status])
    } catch (error) {
        console.error('Error inserting account:', error);
        throw error; // Ném ra lỗi để xử lý ở nơi gọi hàm
    }
};

const editOrderStatus = async (id, status) => {
  try {
      await pool.query( `update orders set status = $2 where id = $1`,[id, status])
  } catch (error) {
      console.error('Error inserting account:', error);
      throw error; // Ném ra lỗi để xử lý ở nơi gọi hàm
  }
};
const editProStatus = async (id, status) => {
  try {
      await pool.query( `update product set status = $2 where id = $1`,[id, status])
  } catch (error) {
      console.error('Error inserting account:', error);
      throw error; // Ném ra lỗi để xử lý ở nơi gọi hàm
  }
};
// Export hàm checkCartExist để sử dụng trong ứng dụng
module.exports = {
  checkCartExist, checkAccountExist: checkAccountExist, getAccount,getAllOrders,
    insertAcc,getProductByCate,category10,category,insertCart,getAllProduct,getCart,hotdeals, getCateName,
    insertOrder,getOrderByAccid,getDetail,editAmountCart, deleteCart,
    searchByName,insertFeedback,getFeedbackByProductid,getTagAll,getTagTelevison,getTagEC,getTagCooker,supplier,
    getSpecialOffer,getCateOnDetail,
    getAllAccount,getAccStatus, getProducts,getMonthly,
    SalesAnalytics,OrdersAnalytics,linecoldata,line,donutData_RBC,donutData_QBC,retention,donutData_QBS,
    SalesAnalytics_yearly:SalesAnalytics_yearly,SalesAnalytics_daily,linecoldata_monthly,
    linecoldata_yearly:linecoldata_yearly,line_monthly,donutData_QBC_year,donutData_RBC_year,OrdersAnalytics_year:OrdersAnalytics_year,
    topCusByQuantity,topCusByQuantity,topCusByAmount,topProByAmount,topProByQuantity,topSupByQuantity,topSupByAmount,topCateByAmount,
    topCateByQuantity, ordersThisMonth,customersThisMonth,productsThismonth,editAccStatus,deleteAllCart,getOrderStatus,editOrderStatus,editProStatus
};
