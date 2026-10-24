export function authorizeModification(req, res, next) {
  const { role, id } = req.user;
  const { userId } = req.params;

  if (role !== "parent" && String(userId) !== String(id)) {
    return res.status(403).json({
      error: "Access denied",
    });
  }

  next();
}