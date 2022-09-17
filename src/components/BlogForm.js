import PropTypes from 'prop-types'
import Notification from './Notification'

const BlogForm = ({
    successMessage,
    blogTitle,
    blogAuthor,
    blogUrl,
    handleCreate,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
}) => {
    return (
    <div>
        <h4>
            Create new blog
        </h4>
        <Notification message={successMessage} notifType="success" />
        <form onSubmit={handleCreate}>
            <div>
            title:
            <input
                type="text"
                value={blogTitle}
                name="title"
                onChange={handleTitleChange}
            />
            </div>
            <div>
            author:
            <input
                type="text"
                value={blogAuthor}
                name="author"
                onChange={handleAuthorChange}
            />
            </div>
            <div>
            url:
            <input
                type="text"
                value={blogUrl}
                name="url"
                onChange={handleUrlChange}
            />
            </div>
            <button type="submit">Create</button>
        </form>
    </div>
    )
}

BlogForm.propTypes = {
    successMessage: PropTypes.string,
    blogTitle: PropTypes.string.isRequired,
    blogAuthor: PropTypes.string.isRequired,
    blogUrl: PropTypes.string.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    handleUrlChange: PropTypes.func.isRequired,
}

export default BlogForm