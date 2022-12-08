import axios from "axios";

export const postData = async(e) => {
    e.preventDefault();
    try{
        const res = await axios.post("http://localhost:3004/users",
        { 
            name: e.target[0].value,
            age: e.target[1].value,
            email: e.target[2].value
        });
        console.log(res);
    }catch(err){
        console.log(err)
    }
}

export const putData = async (e) => {
    e.preventDefault();
    const body = {};
    for (let i = 0; i < e.target.length - 1; i++) {
      if (e.target[i].value) {
        body[e.target[i].placeholder] = e.target[i].value;
      }
    }

    try {
      const res = await axios.put("http://localhost:3004/users/"+e.target[0].value, {
        ...body,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const patchData = async (e) => {
    e.preventDefault();
    const body = {};
    for (let i = 0; i < e.target.length - 1; i++) {
      if (e.target[i].value) {
        body[e.target[i].placeholder] = e.target[i].value;
      }
    }

    try {
      const res = await axios.patch("http://localhost:3004/users/"+e.target[0].value, {
        ...body,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const deleteData = async(e) =>{
    try{
        const res = await axios.delete("http://localhost:3004/users/"+e.target[0].value)
    }
    catch(err){
        console.log(err)
    }
}