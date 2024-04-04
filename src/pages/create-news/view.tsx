import { Typography } from "@mui/material";
import { NewsForm } from "@/widgets/news-form";
import { pxToRem } from "@/shared/css-utils";
import { LoadingLanguages } from "@/entites/loading-languages";
import { Loading } from "./loading.tsx";

export const CreateNewsPage = () => {
	return (
		<section>
			<Typography mb={pxToRem(20)} variant='h1'>
				Create news
			</Typography>
			<LoadingLanguages loadingComponent={<Loading />}>
				<NewsForm />
			</LoadingLanguages>
		</section>
	);
};
