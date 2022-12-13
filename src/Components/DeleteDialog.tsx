import { Dialog, DialogFooter, PrimaryButton } from '@fluentui/react'
import axios from 'axios'
import React from 'react'

const DeleteDialog = ({hideDialog, toggleHideDialog, editId, api, setTrigger}: any) => {

    const handleDelete = async() => {
        try{
            const resp = await axios.delete(`${api}/${editId}`);
            console.log(resp.status);
        } catch {

        }
        setTrigger((x: any) => !x);
        toggleHideDialog();
    }

  return (
    <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        title={<div>Delete</div>}
        dialogContentProps={{subText: "Are you sure you want to delete this?"}}
    >
        <DialogFooter>
            <PrimaryButton text='Delete' onClick={handleDelete} />    
            <PrimaryButton text='Cancel' onClick={toggleHideDialog} />    
        </DialogFooter>   
    </Dialog>
  )
}

export default DeleteDialog