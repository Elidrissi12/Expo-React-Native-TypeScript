import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function FetchData() {
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const json: Post = await response.json();
        if (isMounted) {
          setData(json);
        }
      } catch (e) {
        if (isMounted) {
          setError('Impossible de charger les données.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      {loading && (
        <>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 12 }}>Chargement...</Text>
        </>
      )}

      {!loading && error && <Text style={{ color: 'red' }}>{error}</Text>}

      {!loading && !error && data && (
        <>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>{data.title}</Text>
          <Text>{data.body}</Text>
        </>
      )}
    </View>
  );
}
