//import http from "../http-common";

let categories = [
  {
    id: 1,
    name: "Electronics"
  },
  {
    id: 10,
    name: "Books"
  },
  {
    id: 3,
    name: "Computers"
  }
];

let obj = {
  data: null,
  status: 200
};

export const findAll = () => {

  obj.data = categories

  return new Promise((resolve, reject) => {
    if (categories === []) reject("Não há categorias cadastradas");
    resolve(obj);
  });
};

export const findById = (id) => {

  const category = categories.filter((el) => {
    // eslint-disable-next-line eqeqeq
    return el.id == id
  })

  obj.data = category[0]

  return new Promise((resolve, reject) => {
    if (categories === {}) reject("Categoria não encontrada");
    resolve(obj);
  });
};

export const insert = (data) => {
  categories.push(data)
  obj.data = data

  return new Promise((resolve, reject) => {
    resolve(obj);
  });
};

export const update = (id, data) => {
  console.log(id)
  console.log(data)

  categories = categories.map((el) => {
    // eslint-disable-next-line eqeqeq
    if (el.id === id)
      el = data
    
    return el
  })

  console.log(categories)

  obj.data = data

  return new Promise((resolve, reject) => {
    if (categories === {}) reject("Categoria não encontrada");
    resolve(obj);
  });
};

export const remove = (id) => {
  //return http.delete(`/livro/${id}`);
};








//=============================================
// export const findAll = () => {
//   return http.get("/categories");
// }

// export const findById = (id) => {
//   return http.get(`/categories/${id}`);

// export const insert = (data) => {
//   return http.post("/livro", data);
// };

// export const update = (id, data) => {
//   return http.put(`/livro/${id}`, data);
// }

// export const remove = (id) => {
//   return http.delete(`/livro/${id}`);
// }
