import { SnapsGlobalObject } from "@metamask/snaps-types";

type ConfirmationDialogContent = {
  prompt: string;
  description?: string;
  textAreaContent?: string;
};

export async function showConfirmationDialog(
  snap: SnapsGlobalObject,
  message: ConfirmationDialogContent
): Promise<boolean> {
  return (await snap.request({
    method: "snap_confirm",
    params: [message],
  })) as boolean;
}
