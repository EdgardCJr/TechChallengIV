import { useState } from "react";
import { View, Text } from "react-native-reanimated/lib/typescript/Animated";
import { useNavigate } from "react-router-dom";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "../Home/styles";

export default function Home() {
    const [Post, setPost] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigation = useNavigate();

    <View> 
        <Text> Postagem Fiap </Text>
        <FlatList
            data={Post}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{styles.list}}
            showVerticalScrollIndicator={false}
            numColumns={1}
        />
    </View>

}