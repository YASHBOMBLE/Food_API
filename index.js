import express from "express"

const app=express();

app.use(express.json());

const db=[{
  id : 1,
  title : 'Idli',
  price : 15,
  category : "breakfast "
},
{
  id : 2,
  title : 'Dosa',
  price : 35,
  category : "breakfast "
},
{
  id : 3,
  title : 'Biryani',
  price : 150,
  category : "lunch "
}]

//get all items

app.get('/all-food-items',(req,res)=>{
  res.json({
    success:true,
    data:db,
    message:'All food item fetched successfully'
  })
})

//add items
app.post('/add-food-item',(req,res)=>{

  const{ id ,title,price,category} = req.body;

  const newItem={
    id:id,
    title:title,
    price:price,
    category:category 
  }

  db.forEach((item)=>{
    if(item.id===id)
    {
     return res.json({
        success:false,
        data:null,
        message:'food item exist'
      })
    }
  })

  db.push(newItem);

  res.json({
    success:true,
    data:newItem,
    message:'New food item added successfully'
  })

})


app.get('/food-item-by-id', (req, res) => {
  // read id from query params
  const id = req.query.id

  db.forEach((item) => {
    if (item.id == id) {
      return res.json({
        success: true,
        data: item,
        message: 'Food item fetched successfully'
      })
    }
  })


  res.json({
    success: false,
    data: null,
    message: 'Food item not found'
  })
})

app.get('/delete-food-item-by-id',(req,res)=>{
  const id=req.query.id;

  db.forEach((item,index)=>{
    if(item.id==id)
    {
      db.splice(index,1)
      return res.json({
        success:true,
        data:db,
        message:'Food item deleted successfully'
      })
    }
  })
  res.json(
    {
      success:false,
      data:null,
      message:'Food item not found'
    }
  )
})

app.get('/food-items-by-category',(req,res)=>{
  const category=req.quary.category;

  const temp=[]
  db.forEach((item)=>{
    if(item.category===category)
    {
      temp.push(item)
    }
  })
  res.json({
    success:true,
    data:temp,
    message:`Items for category ${category} fetched`
  })
})

app.listen(5000,()=>{
    console.log("server is running on 5000");
})

