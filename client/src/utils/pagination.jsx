
export default function getPaginatedJobs(limit, page, jobs) {
  const size = jobs.length;
  if (limit) {
    const start = (page - 1) * limit;
    return jobs.slice(start, Math.min(size, start + limit));
  }
  return jobs.slice(0, Math.min(size, page * 10));
}