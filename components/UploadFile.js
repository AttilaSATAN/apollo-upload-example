import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import uploadsQuery from '../queries/uploads'

const UploadFile = ({ mutate }) => {
  const handleChange = ({
    target: {
      validity,
      files: [file]
    }
  }) =>
    validity.valid &&
    mutate({
      variables: { file },
      update(
        proxy,
        {
          data: { fileUpload }
        }
      ) {
        const data = proxy.readQuery({ query: uploadsQuery })
        data.uploads.push(fileUpload)
        proxy.writeQuery({ query: uploadsQuery, data })
      }
    });

  return <input type="file" required onChange={handleChange} />
}

export default graphql(gql`
  mutation($file: Upload!) {
    fileUpload(file: $file) {
      id
      filename
      mimetype
      publicPath
    }
  }
`)(UploadFile)
