import api from "./api";

type ObjImage = {
  file: File | null;
  base64: string;
};

type TypePostCreate = {
  post_content: string;
  url_image: string;
  category: string[];
  obj_image: ObjImage;
  postid?: string;
};

const postService = {
  createNewPost: async (
    { post_content, url_image, category, obj_image }: TypePostCreate,
    token: string
  ) => {
    const url = "/post/addNew.php";

    const data = new FormData();
    data.append("post_content", post_content);
    data.append("category", category.toString());
    data.append("url_image", url_image);

    if (obj_image.file) {
      data.append("obj_image", obj_image.file);
    }
    return api.callFormData(url, { data, token });
  },
  editPost: async ({ post_content, url_image, category, obj_image, postid }: TypePostCreate, token: string) => {
    const url = "/post/edit.php";
    const data = new FormData();
    data.append("post_content", post_content);
    data.append("category", category.toString());
    data.append("url_image", url_image);
    data.append("postid", postid)

    if (obj_image.file) {
      data.append("obj_image", obj_image.file);
    }

    return api.callFormData(url, { data, token });

  },
  getPostsPaging: async ({ pagesize = 3, currPage = 1 } = {}) => {
    const url = `/post/getListPagination.php?pagesize=${pagesize}&currPage=${currPage}`;
    return api.callJson(url);
  },
  getPostsPagingByCategory: async ({
    pagesize = 10,
    currPage = 1,
    tagIndex = "",
  } = {}) => {
    if (!tagIndex) {
      return null;
    }
    const url = `/post/getListByCategory.php?pagesize=${pagesize}&currPage=${currPage}&tagIndex=${tagIndex}`;
    return api.callJson(url);
  },
  getPostsByPostId: async ({ postid, token }) => {
    if (!postid || !token) {
      return {
        status: 500,
        error: "",
      };
    }
    const url = `/post/post.php?postid=${postid}`;
    return api.callJson(url, {
      token,
    });
  },
  getPostsByUserId: async ({ userid, token }) => {
    if (!userid || !token) {
      return {
        status: 200,
        posts: [],
      };
    }
    const url = `/post/getListPostUserID.php?userid=${userid}`;
    return api.callJson(url, { token });
  },
  getPostSearch: async ({ query }) => {
    return api.callJson(`/post/search.php?query=${encodeURI(query)}`);
  },
  getCategories: async () => {
    return api.callJson("/categories/index.php");
  },
  getCommentByPostId: async (postid) => {
    const url = `/comment/comments.php?postid=${postid}`;
    return api.callJson(url);
  },
  postComment: async (postid: string, comment: string, token: string) => {
    const url = "/comment/add_new.php";
    const method = "POST";
    const data = {
      comment,
      postid,
    };
    return api.callJson(url, {
      method,
      token,
      data,
    });
  },
};

export default postService;
