import { NotificationCenterItem as OriginalNotificationCenterItem, useNotificationCenter } from "react-toastify/addons/use-notification-center";

interface NotificationCenterItem extends OriginalNotificationCenterItem {
  id : number | string;
  title?: string;
}

import { NotificationIcon, TrashIcon } from "../icons";
import { Button, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

const NotificationCenter = () => {
  const {
    notifications,
    clear,
    markAllAsRead,
    markAsRead,
    remove,
    unreadCount
  } = useNotificationCenter();

  return (
    <div>
      <Popover
      showArrow
      placement="bottom"
      className="dark"
      classNames={{
        content: "items-stretch"
      }}
    >
      <PopoverTrigger>
        <Button isIconOnly className="overflow-visible">
          <NotificationIcon className="text-primary-900 text-xs" />
            {unreadCount > 0 &&
              <div className="absolute -top-1 -right-1 w-[1rem] h-[1rem] bg-primary-500 rounded-full flex items-center justify-center text-xs">
                {unreadCount}
              </div>
            }
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-3">
        <div className="flex justify-between items-center gap-8">
          <div className="text-default-400 text-xs py-2 flex flex-col">
            <span className="text-default-700 text-lg">Notifications</span>
            Unread notifications: {unreadCount}
          </div>
          <Button
            size="sm"
            onClick={() => {
              markAllAsRead();
              clear();
            }}
            disabled={notifications.length === 0}
          >
            Mark all as read
          </Button>
        </div>

        {notifications.length === 0 ? (
          <div className="text-default-400 text-xs text-center my-3">No notifications</div>
        ) : (
            <Listbox
              classNames={{
                base: "mr-2",
                list: "max-h-[300px] overflow-auto overflow-y-scroll",
              }}
              items={notifications}
              label="Assigned to"
              variant="flat"
            >
              {(item : NotificationCenterItem) => (
                <ListboxItem key={item.id} textValue=" " >
                  <div className="w-full flex items-center justify-between">
                    <span className="text-tiny text-default-400">{item.content?.toString()}</span>
                    <Button
                      size="sm"
                      variant="light"
                      isIconOnly
                      onClick={() => {
                        markAsRead(item.id);
                        remove(item.id);
                      }}
                    >
                      <TrashIcon className="text-primary-900 text-xs" />
                    </Button>
                  </div>
                </ListboxItem>
              )}
          </Listbox>
        )}
      </PopoverContent>
    </Popover>
    </div>
  )
}

export default NotificationCenter