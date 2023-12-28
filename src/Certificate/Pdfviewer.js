import React , { useEffect, useState }from 'react'

const Pdfviewer = (blobData) => {
    const [pdfURL, setPDFURL] = useState('');
    useEffect(({}) => {
        if (blobData instanceof Blob) {
          const url = URL.createObjectURL(blobData);
          setPDFURL(url);
        }
        // Clean up URL object when unmounting or when blobData changes
        return () => URL.revokeObjectURL(pdfURL);
      }, [blobData]);
    
      return (
        <div>
          {pdfURL && (
            <iframe
              title="PDF Viewer"
              src={pdfURL}
              width="100%"
              height="500px"
              style={{ border: 'none' }}
            />
          )}
        </div>
      );
    
}

export default Pdfviewer