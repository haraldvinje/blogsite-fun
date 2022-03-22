import AuthCheck from "components/AuthCheck"
import { CreateNewPost } from "components/PostComponents/CreateNewPost"
import { PostList } from "components/PostComponents/PostList"

const AdminPostsPage = () => {
    return (
        <main>
            <AuthCheck>
                <CreateNewPost />
                <PostList />
            </AuthCheck>
        </main>
    )
}

export default AdminPostsPage