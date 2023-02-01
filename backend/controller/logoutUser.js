
const logoutUser = async (req, res) => {
    await res.clearCookie("accessToken", {
        path: '/',
        secure: true,
        sameSite: "none",
        maxAge: 0
    }).status(200).json("User logged out successfully")
}

export default logoutUser