import React from 'react'

const messages = ({message:{name,user_id,text},current_uid}) => {
    return (
        <div>
            {name}:{text}
        </div>
    )
}

export default messages
