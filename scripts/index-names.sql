\t on
\pset format unaligned

WITH names(name, weight) AS (
  SELECT
    labels->>'__name__' AS name,
    COUNT(DISTINCT(lid)) AS weight
  FROM metric_labels
  GROUP BY labels->>'__name__'
)
SELECT json_agg(names) FROM names \g src/resource/names.json
