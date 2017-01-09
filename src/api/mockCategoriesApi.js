import delay from './delay';
import * as _ from 'lodash';

const categories = [
  {
    id: 'books-are-meant-to-be-read',
    name: "Books",
    slug: "books"
  },
  {
    id: 'foodstuffs-should-always-be-eaten',
    name: "Food Stufs",
    slug: "food-stuffs"
  },
  {
    id: 'clothes-should-be-put-on',
    name: "Clothes",
    slug: "clothes"
  },
  {
    id: "electronics-need-electricity",
    name: "Electronics",
    slug: "electronics"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

const generateCategoryId = (category) => {
  return replaceAll(category.name, ' ', '-');
};

const generateCategorySlug = (category) => {
    return replaceAll(_.lowerCase(category.name), ' ', '-');
};

class CategoryApi {
  static getAllCategories(){
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        resolve(Object.assign([], categories));
      }, 2000);
    });
  }

  static saveCategory(category) {
    return new Promise( (resolve,reject) => {
      setTimeout( () => {
        const minCategoryNameLength = 1;
        if (category.name.length < minCategoryNameLength) {
          reject(`Name must be at least ${minCategoryNameLength} characters.`);
        }

        if(category.id) {
          const existingCourseIndex = category.findIndex(a => a.id == category.id);
          categories.splice(existingCourseIndex, 1, category);
        } else {
          // simulate creation
          category.id = generateCategoryId(category);
          category.slug = generateCategorySlug(category);
          categories.push(category);
        }
        //resolve(Object.assign({}, category));
        resolve([category])
      }, delay);
    });
  }

  static deleteCategory(categoryId) {
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        const indexCategoryToDelete = categories.findIndex(category => {
          category.categoryId == categoryId;
        });
        categories.splice(indexCategoryToDelete, 1);
        resolve();
      }, delay);
    });
  }

}

export default CategoryApi;
