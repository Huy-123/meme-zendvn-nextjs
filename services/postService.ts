import api from "./api";

const postService = {
  getPostsPaging: async ({ pagesize = 3, currPage = 1 } = {}) => {
    const url = `/post/getListPagination.php?pagesize=${pagesize}&currPage=${currPage}`;
    return api.callJson(url);
  },
  getPostsPagingByCategory: async ({ pagesize = 10, currPage = 1, tagIndex = '' } = {}) => {
    if(!tagIndex){
      return null
    }
    const url = `/post/getListByCategory.php?pagesize=${pagesize}&currPage=${currPage}&tagIndex=${tagIndex}`;
    return api.callJson(url);
  },
  getPostsByUserId: async ({ userid, token }) => {
    if(!userid || !token){
      return {
        status: 200,
        posts: []
      }
    }
    const url = `/post/getListPostUserID.php?userid=${userid}`;
    return api.callJson(url, { token });
  },
  getPostSearch: async ({query}) => {
    return api.callJson(`/post/search.php?query=${encodeURI(query)}`)
  },
  getCategories: async () => {
    return api.callJson('/categories/index.php')
  }
};

export default postService;
