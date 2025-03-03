import { Notification, User } from "../db/sequelize.js";

const notificationController = {
  create: async (req, res) => {
    try {
      const createdNotif = await Notification.create({
        notifiableType: req.body.notifiableType,
        notifiableId: req.body.notifiableId || null,
        postId: req.body.postId || null,
        sender: req.auth.userId || req.body.sender,
        senderUsername: req.body.senderUsername,
        senderProfilePicture: req.body.senderProfilePicture,
        receiver: req.body.receiver,
      });
      res.status(201).send(createdNotif);
    } catch {
      res.status(500).send();
    }
  },
  getOne: async (req, res) => {
    try {
      const notification = await Notification.findByPk(req.params.notifId, {});
      res.status(200).send(notification);
    } catch {
      res.status(500).send();
    }
  },
  getAll: async (req, res) => {
    try {
      const allNotifications = await Notification.findAll({
        where: {
          receiver: req.params.userId,
        },
        order: [
          ["createdAt", "DESC"], // Du plus récent au moins récent
        ],
      });
      const nonViewedNotifs = allNotifications.reduce((acc, curr) => {
        if (!curr.isRead) {
          return acc + 1;
        }
        return acc;
      }, 0);
      // For the infinite scroll, to display nexts posts
      if ("lastNotifId" in req.query) {
        const lastNotification = allNotifications.findIndex(
          (notification) => notification.id === parseInt(req.query.lastNotifId)
        );
        if (lastNotification === -1) {
          return res.status(400).send({ message: "Notification not found" });
        }
        const start = lastNotification + 1;
        const end = start + 10;
        const nextNotifications = allNotifications.slice(start, end);
        if (nextNotifications.length === 0) {
          return res.status(200).send({ message: "No more notifications" });
        }
        if (start + 1 === allNotifications.length) {
          return res
            .status(200)
            .send(allNotifications.slice(start, allNotifications.length));
        }
        return res.status(200).send(nextNotifications);
      }
      res
        .status(200)
        .send({ notifs: allNotifications.slice(0, 10), nonViewedNotifs });
    } catch {
      res.status(500).send();
    }
  },
  update: async (req, res) => {
    const notification = await Notification.findByPk(req.params.notifId);
    try {
      await notification.update({
        isRead: true,
      });
      res.status(201).send(notification);
    } catch {
      res.status(500).send();
    }
  },
  updateAll: async (req, res) => {
    const notifications = await Notification.findAll({
      where: {
        receiver: req.params.userId,
      },
      order: [
        ["createdAt", "DESC"], // Du plus récent au moins récent
      ],
    });
    try {
      for (const notif of notifications)
        if (notif.isRead === false) {
          await notif.update({
            isRead: true,
          });
        }
      res.status(201).send(notifications);
    } catch {
      res.status(500).send();
    }
  },
  delete: async (req, res) => {
    const notification = await Notification.findByPk(req.params.notifId);
    try {
      await notification.destroy();
      res.status(200).json({ message: "Notification deleted" });
    } catch {
      res.status(500).send();
    }
  },
};

export default notificationController;
