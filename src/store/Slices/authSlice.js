import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  status: false,
  userData: null,
};


export const createAccount = createAsyncThunk("register", async (data) => {
  const formData = new FormData();
  formData.append("avatar", data.avatar[0]);
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("fullName", data.fullName);
  if (data.coverImage) {
    formData.append("coverImage", data.coverImage[0]);
  }

  console.log("form signup", formData);

  try {
    const response = await axiosInstance.post("/users/register", formData);
    console.log("API Response:", response.data); // ✅ Log response
    toast.success("Registered successfully!!!");

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});



export const userLogin = createAsyncThunk("login", async (data) => {
  try {
    const response = await axiosInstance.post("/users/login", data);
    return response.data.data.user;
  } catch (error) {
    toast.error(error?.response?.data?.error, "jjdjdj");
    throw error;
  }
});


// export const userLogin = createAsyncThunk("login", async (data) => {
//   try {
//     const response = await axiosInstance.post("/users/login", data);

//     // Extract the accessToken and refreshToken from response
//     const { accessToken, refreshToken, user } = response.data.data;

//     // Store access token in localStorage
//     localStorage.setItem("token", accessToken);

//     // Store refresh token in cookies (optional but recommended)
//     document.cookie = `refreshToken=${refreshToken}; path=/; secure; HttpOnly`;

//     toast.success("Login successful!");
//     return user;
//   } catch (error) {
//     toast.error(error?.response?.data?.error || "Login failed");
//     throw error;
//   }
// });


















export const userLogout = createAsyncThunk("logout", async () => {
  try {
    const response = await axiosInstance.post("/users/logout");
    toast.success(response.data?.message);

    localStorage.removeItem("token");

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const refreshAccessToken = createAsyncThunk(
  "refreshAccessToken",
  async (data) => {
    try {
      const response = await axiosInstance.post("/users/refresh-token", data);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (data) => {
    try {
      const response = await axiosInstance.post("/users/change-password", data);
      toast.success(response.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  const response = await axiosInstance.get("/users/current-user");
  console.log(response.data.data);
  

  return response.data.data;
});


export const updateAvatar = createAsyncThunk("updateAvatar", async (avatar) => {
  try {
    const response = await axiosInstance.put("/users/update-avatar", avatar);
    toast.success("Updated details successfully!!!");
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const updateCoverImg = createAsyncThunk(
  "updateCoverImg",
  async (coverImage) => {
    try {
      const response = await axiosInstance.put(
        "/users/update-coverImage",
        coverImage
      );
      toast.success(response.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "updateUserDetails",
  async (data) => {
    try {
      const response = await axiosInstance.put("/users/update-account-details", data);
      toast.success("Updated details successfully!!!");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAccount.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(userLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
      
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
    builder.addCase(updateAvatar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateAvatar.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCoverImg.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCoverImg.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateCoverImg.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
  },
});

// export const { updateUser } = authSlice.actions;

export default authSlice.reducer;
