import { NotificationCenterItem as OriginalNotificationCenterItem, useNotificationCenter } from "react-toastify/addons/use-notification-center";

interface NotificationCenterItem extends OriginalNotificationCenterItem {
  id : number | string;
  title?: string;
}

import { NotificationIcon, TrashIcon } from "../icons";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

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
          notifications.map((notification: NotificationCenterItem) => (
            <div
              key={notification.id}
              className="flex items-center justify-between py-1 gap-3"
            >
              <div className="flex items-center">
                {notification.title && <div className="text-default-900 text-xs pr-2">{notification.title}</div>}
                <div className="text-default-300 text-xs">{String(notification.content)}</div>
              </div>
              <Button
                size="sm"
                variant="light"
                isIconOnly
                onClick={() => {
                  markAsRead(notification.id);
                  remove(notification.id);
                }}
              >
                <TrashIcon className="text-primary-900 text-xs" />
              </Button>
            </div>
          ))
        )}
      </PopoverContent>
    </Popover>
  )
}

export default NotificationCenter