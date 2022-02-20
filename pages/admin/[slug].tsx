import AuthCheck from '../../components/AuthCheck'
import { PostManager } from '../../components/PostComponents/PostManager'

const AdminPostsPage = () => {
    return (
        <AuthCheck>
            <PostManager />
        </AuthCheck>
    )
}

export default AdminPostsPage